import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Response } from "express";
import User from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
dotenv.config()

const adminEmails = [process.env.ADMIN_1,process.env.ADMIN_2,process.env.ADMIN_3];

const verifyJWT = asyncHandler(async(req:any,_:Response,next:NextFunction)=>{

    try {
        const token = req.cookies?.accessToken ||req.body.token|| req.header("Authorization")?.replace("Bearer ","");
        console.log(req.cookies?.accessToken, req.header("Authorization")?.replace("Bearer ",""),req.body.token);
        if (!token) {
            throw new ApiError(401,"Unauthorized request");
        }
        if (!process.env.ACCESS_TOKEN_SECRET) return
        const decodedToken:any = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if(!user){
            throw new ApiError(401,"Invalid Access Token");
        }
        req.user = user;
        next();
    } catch (error:any) {
        throw new ApiError(401,error?.message || "Invalid Access Token")
    }
})

const verifyAdmin = asyncHandler(async(req:any,_:Response,next:NextFunction)=>{
    try {
        const userEmail = req.user?.email;
        console.log(userEmail);
        if (!adminEmails.includes(userEmail)) {
            throw new ApiError(401,"You are not the admin.");
        }
        next();
    } catch (error:any) {
        throw new ApiError(401,error?.message || "Invalid Access Token")
    }
})


export {verifyJWT,verifyAdmin}