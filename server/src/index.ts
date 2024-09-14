import dotenv from "dotenv";
import connectDB from "./config/database.config";
import { app } from "./app";
import { connectCloudinary } from "./config/cloudinary.config";
import os from 'os';
import fs from 'fs';
import path from 'path';

const uploadsDir = path.join(os.tmpdir(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

dotenv.config()

connectDB()
.then(()=>{
    connectCloudinary();
    app.on("error",(error)=>{
        console.log("ERR: ",error);
        throw error
    })
    app.listen(process.env.PORT||3000,()=>{
        console.log(`Server running on port ${process.env.PORT}`);
    })
})
.catch((err:Error)=>{
    console.log("MongoDB connection error !!! ",err);
})
