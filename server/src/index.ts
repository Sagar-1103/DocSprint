import dotenv from "dotenv";
import connectDB from "./config/database.config";
import { io, server } from "./app";
import { connectCloudinary } from "./config/cloudinary.config";
import os from 'os';
import fs from 'fs';
import path from 'path';
import DocumentModel, { IDocument } from "./models/document.model";

const uploadsDir = path.join(os.tmpdir(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

dotenv.config()

connectDB()
.then(()=>{
    connectCloudinary();
    io.on('connection', (socket) => {
        socket.on('get-document',async(documentId)=>{
            const document = await findOrCreateDocument(documentId);
            console.log("Gas",document.description);
            socket.join(documentId);
            socket.emit('load-document',document);
            socket.on('send-changes',(delta)=>{
                socket.broadcast.to(documentId).emit('receive-changes',delta);
            })
            socket.on('save-document',async(data)=>{
                console.log(data);
                await DocumentModel.findOneAndUpdate({docId:documentId},{description:data})
            })
        })
    });
    server.listen(process.env.PORT||3000,()=>{
        console.log(`Server running on port ${process.env.PORT}`);
    })
})
.catch((err:Error)=>{
    console.log("MongoDB connection error !!! ",err);
}) 

const defaultDescription = { ops: [ { insert: 'Click anywhere on the document to type\n' } ] };
const defaultTitle = 'Untitled'; 

const findOrCreateDocument:any = async(documentId:any)=>{
    if (documentId==null) return
    let document:any = await DocumentModel.findOne({docId:documentId});
    if (!document) {    
        document = await DocumentModel.create({title:defaultTitle,description:defaultDescription,docId:documentId});
        // console.log("New Created");
    }
    // console.log("Already There");
    return document;
}