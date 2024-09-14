import mongoose,{Document,Model,Schema} from "mongoose";
import { IUser } from "./user.model";

export interface IDocument extends Document {
    title:string;
    description:string;
    users: {
      user:IUser;
      role:string;
    }[]
}

const documentSchema = new Schema({
    title:{
        type:String,
        default:"Untitled-1",
        trim:true,
    },
    description:{
        type:String,
        trim:true
    },
    users:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:"User"
            },
            role:{
                type:String,
                enum:["Admin","Editor","Viewer"],
                default:"Viewer"
            }
        }
    ]
},{
    timestamps:true
})


const DocumentModel:Model<IDocument>= mongoose.model<IDocument>("DocumentModel",documentSchema);

export default DocumentModel;