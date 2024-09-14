import { FileText} from "lucide-react";

const TemplateCard = ({ title,documentType}: any) => {

  return (
    <div
      className=" rounded-sm p-3 flex flex-col items-start w-60 relative cursor-pointer"
    >
      <div className="bg-gray-100 hover:border-blue-300 border-2 w-full relative h-40 mb-4 rounded-lg flex items-center justify-center">
        <FileText className="text-gray-500 w-12 h-12" />
      </div>

      <h3 className="text-md pl-2 font-semibold -mt-2 text-gray-800 truncate w-full">
        {title}
      </h3>
      <p className="text-sm pl-2 w-full text-gray-500">{documentType}</p>
     
    </div>
  );
};

export default TemplateCard;
