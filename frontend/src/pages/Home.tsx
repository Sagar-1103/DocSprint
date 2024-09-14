import { Twitter, Facebook, Instagram } from "lucide-react"; // Importing Lucide React icons
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
          <h1 className="text-6xl lg:text-7xl font-extrabold text-white leading-tight font-sans">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">
              DocSprint
            </span>
          </h1>
          <p className="text-xl lg:text-2xl font-semibold text-purple-200 tracking-wide">
            Seamless online document creation and collaboration
          </p>
          <p className="text-lg text-gray-200 leading-relaxed">
            Work together in real-time, share ideas, and create documents from anywhere. With DocSprint, editing and collaboration become effortless.
          </p>
          <Link to={"/login"}>
          <button className="bg-white w-full text-purple-500 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-purple-100 transition-transform transform hover:scale-105 duration-300 ease-in-out text-lg">
            Start Writing
          </button>
          </Link>

          {/* Social Media */}
          <div className="flex space-x-6 pt-6">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-300 transition flex items-center space-x-2"
            >
              <Twitter className="w-6 h-6" />
              <span className="text-lg font-medium">Twitter</span>
            </a>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-300 transition flex items-center space-x-2"
            >
              <Facebook className="w-6 h-6" />
              <span className="text-lg font-medium">Facebook</span>
            </a>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-300 transition flex items-center space-x-2"
            >
              <Instagram className="w-6 h-6" />
              <span className="text-lg font-medium">Instagram</span>
            </a>
          </div>
        </div>

        {/* Right Section - Mobile Image */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="bg-transparent rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-500 ease-in-out max-w-sm">
            <div className="mockup-phone">
              <div className="camera"></div>
              <div className="display">
                <div className="artboard artboard-demo phone-1 text-white text-center text-lg">
                  Create, Edit, Collaborate
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
