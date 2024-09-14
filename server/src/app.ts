import express,{Request,Response} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config()

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(cookieParser());
app.use(express.json({limit:"16kb"}));

import homeRouter from "./routes/home.routes"
app.use("/api",homeRouter)

export {app}
