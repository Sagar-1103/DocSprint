import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useEffect, useState } from "react";
import "./TextEditor.css";
import EditorHeader from "./EditorHeader";
import { io, Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
import { throttle } from "lodash";

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ size: ["small", false, "large", "huge"] }],
  ["bold", "italic", "underline", "strike"],
  [{ script: "sub" }, { script: "super" }],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  ["blockquote", "code-block"],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ["link", "image", "video", "formula"],
  ["clean"],
];

type SocketType = Socket | undefined;

const TextEditor = () => {
  const [socket, setSocket] = useState<SocketType>();
  const [quill, setQuill] = useState<Quill>();
  const {id:documentId} = useParams();
  const wrapperRef = useCallback((wrapper: any) => {
    if (wrapper === null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
    });
    q?.disable();
    q?.setText('Loading...');
    setQuill(q);
  }, []);

  useEffect(() => {
    const s = io(`http://localhost:3000`);
    setSocket(s);
    return () => {
      s?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket==null || quill==null) return;
    const handler = (delta: any) => {
      quill.updateContents(delta)
    };
    socket?.on("receive-changes",handler);
    return () => {
      socket?.off("receive-changes",handler);
    };
  }, [socket,quill]);

  useEffect(() => {
    if (socket==null || quill==null) return;
    const handler = (delta: any, oldDelta: any, source: string) => {
      if (source !== "user") return;
      socket?.emit("send-changes", delta);
      handleAutoSaving();
    };
    quill?.on("text-change",handler);
    return () => {
      quill?.off("text-change",handler);
    };
  }, [socket,quill]);

  useEffect(()=>{
    if(socket==null || quill==null) return
    
    socket.once('load-document',(document)=>{
      console.log("Load",document);
      quill.setContents(document.description);
      console.log("LoHI",quill.getContents());
      quill.enable();
    })
    socket.emit('get-document',documentId)
  },[socket,quill,documentId])

  // useEffect(()=>{
  //   if(socket==null || quill==null) return
  //   const interval = setInterval(() => {
  //     socket.emit('save-document',quill.getContents())
  //   }, 10000);

  //  return()=>{
  //     clearInterval(interval);
  //   }
  // },[socket,quill])

  const handleAutoSaving = throttle(() => {
    if (socket == null || quill == null) return;
    socket.emit("save-document", quill.getContents());
  }, 3000, { leading: false, trailing: true });

  return (
    <div>
      <EditorHeader />
      <div className="container" ref={wrapperRef}></div>
    </div>
  );
};

export default TextEditor;
