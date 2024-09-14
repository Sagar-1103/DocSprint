import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";



const home = asyncHandler(async(req:Request,res:Response)=>{
    return res
    .status(201)
    .json(new ApiResponse<string>(200,"Server Connected"));
})

const health = asyncHandler(async(req:Request,res:Response)=>{
    return res
    .status(201)
    .json(new ApiResponse<{author: string;}>(200,{ author: "Sagar Shirgaonkar" }, "Server is Healthy"));
})

export {home,health}