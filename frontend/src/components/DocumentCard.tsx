import { FileText, EllipsisVertical, ExternalLink, Edit, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const DocumentCard = ({ title, openedDate }: any) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  // Close dropdown if clicked outside the card
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setDropdownVisible(false);  // Close the dropdown when clicking outside the card
      }
    };

    // Add event listener for clicks outside the card
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="hover:border-blue-300 rounded-sm p-3 border-2 flex flex-col items-start w-60 relative cursor-pointer"
    >
      <div className="bg-gray-100 w-full relative h-40 mb-4 border rounded-lg flex items-center justify-center">
        <FileText className="text-gray-500 w-12 h-12" />
      </div>

      <h3 className="text-md px-4 font-semibold text-gray-800 truncate w-full">
        {title}
      </h3>

      <div className="flex py-1 px-3 w-full relative">
        <FileText className="text-gray-500 mr-2" />
        <p className="text-sm text-gray-500 mt-1">Opened {openedDate}</p>

        {/* Ellipsis icon to open dropdown */}
        <div className="absolute right-0 bottom-0">
            <div className="rounded-full hover:bg-gray-300 p-1">

          <EllipsisVertical
            className="text-gray-500 "
            onClick={toggleDropdown}
            />
            </div>

          {/* Dropdown menu */}
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 bg-white shadow-md border rounded-md py-1 w-48 z-10">
              <button
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => alert("Open in New Tab clicked")}
              >
                <ExternalLink className="w-4 h-4 mr-2 text-gray-600" />
                Open in New Tab
              </button>
              <button
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => alert("Rename clicked")}
              >
                <Edit className="w-4 h-4 mr-2 text-gray-600" />
                Rename
              </button>
              <button
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => alert("Remove clicked")}
              >
                <Trash2 className="w-4 h-4 mr-2 text-gray-600" />
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
