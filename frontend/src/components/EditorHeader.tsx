import { useState } from "react";
import Lottie from "lottie-react";
import DocAnimation from "../animation/doc-animation.json";
import { Star } from "lucide-react";

const EditorHeader = () => {
  const [docTitle, setDocTitle] = useState("Untitled document");
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = (e: any) => {
    setDocTitle(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (docTitle.trim() === "") {
      setDocTitle("Untitled document"); // Reset if empty
    }
  };

  return (
    <div className="navbar z-10  bg-base-100">
      <div className="flex-1">
        <div className="flex">
          <Lottie
            className="w-14 h-14"
            animationData={DocAnimation}
            loop={true}
          />
          <div className="flex flex-col">
            <div className="flex">
              {isEditing ? (
                <input
                  type="text"
                  value={docTitle}
                  onChange={handleTitleChange}
                  onBlur={handleBlur}
                  className="my-auto border border-gray-300 rounded-md px-2 min-w-fit  text-xl"
                  autoFocus
                />
              ) : (
                <p
                  className="my-auto border border-white hover:border-gray-500 text-xl cursor-text w-fit rounded-md px-2"
                  onClick={() => setIsEditing(true)}
                >
                  {docTitle}
                </p>
              )}
              <div className="my-auto mx-2 hover:bg-gray-300 rounded-full p-2">
              <Star />
              </div>
            </div>

            <div className="flex space-x-0">
              <p className="hover:bg-gray-200 rounded-md px-2 py-0.5 cursor-pointer">
                File
              </p>
              <p className="hover:bg-gray-200 rounded-md px-2 py-0.5 cursor-pointer">
                Edit
              </p>
              <p className="hover:bg-gray-200 rounded-md px-2 py-0.5 cursor-pointer">
                View
              </p>
              <p className="hover:bg-gray-200 rounded-md px-2 py-0.5 cursor-pointer">
                Insert
              </p>
              <p className="hover:bg-gray-200 rounded-md px-2 py-0.5 cursor-pointer">
                Format
              </p>
              <p className="hover:bg-gray-200 rounded-md px-2 py-0.5 cursor-pointer">
                Tools
              </p>
              <p className="hover:bg-gray-200 rounded-md px-2 py-0.5 cursor-pointer">
                Share
              </p>
              <p className="hover:bg-gray-200 rounded-md px-2 py-0.5 cursor-pointer">
                Extensions
              </p>
              <p className="hover:bg-gray-200 rounded-md px-2 py-0.5 cursor-pointer">
                Help
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content  bg-base-100 rounded-box z-[20] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;
