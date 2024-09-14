import { useState, useRef, useEffect } from 'react';
import { Folder, ArrowUpDown, List ,ChevronDown} from "lucide-react";
import DocumentCard from "../components/DocumentCard";

const RecentDocuments = () => {
    const documents = [
        { title: "Mini Assignment - 4", openedDate: "Sep 7, 2024" },
        { title: "VLSI Design Lab", openedDate: "Sep 6, 2024" },
        { title: "Digital Communication Assignment", openedDate: "Sep 5, 2024" },
        { title: "Mini Assignment - 2", openedDate: "Sep 3, 2024" },
        { title: "Mini Assignment - 2", openedDate: "Sep 3, 2024" },
        { title: "Mini Assignment - 2", openedDate: "Sep 3, 2024" },
      ];
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const dropdownRef = useRef<HTMLDivElement | null>(null);
    
      // Toggle dropdown visibility
      const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
      };
    
      // Close dropdown if clicked outside
      const handleClickOutside = (event:any) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsDropdownOpen(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);
    
      
  return (
    <div className="min-h-screen mx-auto w-[80%] p-6">
        <div className="flex justify-between align-middle gap-2">
          <p className="text-2xl my-auto font-bold ml-2 mb-6">Recent Documents</p>
          
          <div className="relative">
            <div className='flex' onClick={toggleDropdown}>
            <p 
              className="text-xl my-auto cursor-pointer mb-6"
            >
              Owned by anyone
            </p>
            <ChevronDown className="text-gray-500 absolute -right-6 top-1 cursor-pointer" />
            </div>
            
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute z-10 top-full mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg"
              >
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100">Owned by anyone</li>
                  <li className="px-4 py-2 hover:bg-gray-100">Owned by me</li>
                </ul>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <p className="text-xl my-auto rounded-full hover:bg-gray-300 p-1 mb-6">
              <List className="text-gray-500 " />
            </p>
            <p className="text-xl my-auto rounded-full hover:bg-gray-300 p-1 mb-6">
              <ArrowUpDown className="text-gray-500" />
            </p>
            <p className="text-xl my-auto rounded-full hover:bg-gray-300 p-1 mb-6">
              <Folder className="text-gray-500" />
            </p>
          </div>
        </div>
        {/* Flexbox Layout */}
        <div className="container mx-auto flex flex-wrap gap-0">
          {documents.map((doc, index) => (
            <div key={index} className="px-3 mb-6">
              <DocumentCard title={doc.title} openedDate={doc.openedDate} />
            </div>
          ))}
        </div>
      </div>
  )
}

export default RecentDocuments
