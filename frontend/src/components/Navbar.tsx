import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import DocAnimation from "../animation/doc-animation.json";

const Navbar = () => {
  return (
    <div className="navbar shadow-md z-10 bg-base-100">
      <div className="flex-1">
        <Link to={"/documents"} className="btn btn-ghost text-xl">
        <div className="flex">
        <Lottie className='w-12 h-12' animationData={DocAnimation} loop={true} />
        <p className="my-auto">DocSprint</p>
        
        </div>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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

export default Navbar;
