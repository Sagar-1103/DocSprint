import { ApiResponse } from "./ApiResponse";
import { Request,Response,NextFunction} from "express";

const asyncHandler = (fn:Function)=>async(req:Request,res:Response,next:NextFunction)=>{
  try {
    await fn(req,res,next)
  } catch (error) {
    const statusCode = (error as any).statusCode || 500;
    const message = (error as Error).message || "Internal Server Error";
    res.status(statusCode).json(new ApiResponse(statusCode, undefined, message));
    }
  }
  
  export { asyncHandler };