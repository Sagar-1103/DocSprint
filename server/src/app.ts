import express from "express";
import { createServer } from "node:http";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config()
import { Server } from "socket.io";


const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST"],
        credentials: true,
    },
});

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

export {server,io}
