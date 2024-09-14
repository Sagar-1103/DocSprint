import { useState, useRef, useEffect } from 'react';
import { EllipsisVertical ,ChevronsUpDown} from "lucide-react";
import TemplateCard from "../components/TemplateCard";

const Templates = () => {
    const documents = [
        { title: "Resume", documentType: "Coral" },
        { title: "Resume", documentType: "Serif" },
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
    <div className='bg-blue-50'>
    <div className="  mt-1 mx-auto w-[80%] p-6">
        <div className="flex justify-between align-middle gap-2">
          <p className="text-2xl my-auto font-bold ml-2 mb-6">Start a new document</p>
          
          <div className="relative flex">
            <div className='flex relative'>
            <p 
              className="text-xl my-auto mr-2 cursor-pointer mb-6"
            >
              Template gallery
            </p>
            <ChevronsUpDown className="text-gray-500 absolute -right-6 top-2 cursor-pointer" />
            </div>
            
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute z-10 top-full mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg"
              >
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100">Hide all templates</li>
                </ul>
              </div>
            )}
            <p className="text-xl my-auto rounded-full hover:bg-gray-300  ml-7 p-1 mb-6 cursor-pointer"  onClick={toggleDropdown}>
              <EllipsisVertical className="text-gray-500" />
            </p>
          </div>

            
        </div>
        {/* Flexbox Layout */}
        <div className="container mx-auto flex flex-wrap gap-0">
            <TemplateCard title={"Blank Document"}/>
          {documents.map((doc, index) => (
            <div key={index} className="px-3 mb-6">
              <TemplateCard title={doc.title} documentType={doc.documentType} />
            </div>
          ))}
        </div>
        </div>

      </div>
  )
}

export default Templates
