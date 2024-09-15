import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import  User from "../models/user.model";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { uploadOnCloudinary } from "../utils/cloudinary";

const generateAccessAndRefreshTokens = async (userId:any) => {
    try {
      const loggedUser:any = await User.findById(userId);
      const accessToken = loggedUser.generateAccessToken();
      const refreshToken = loggedUser.generateRefreshToken();
  
      loggedUser.refreshToken = refreshToken;
      await loggedUser.save({ validateBeforeSave: "false" });
      return { accessToken, refreshToken, loggedUser };
    } catch (error) {
      throw new ApiError(
        500,
        "Something went wrong while generating refresh and access tokens"
      );
    }
  };

const registerUser = asyncHandler(async (req:any, res:Response) => {
    const { fullName, username, email, password } = req.body;

  if (!email && !password  && !fullName  && !username) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath = await req?.files?.avatar?.[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file from server is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req:Request, res:any) => {
  
    const {email, password } = req.body;
  
    if (!email) {
      throw new ApiError(400, "Email is required");
    }
  
    const user: any = await User.findOne({ email }).select("+password");
    
    
    if (!user) {
        throw new ApiError(404, "User doesnt exist");
    }
    
    const isPasswordValid = await user.isPasswordCorrect(password);
  
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }
  
    const { accessToken, refreshToken, loggedUser }:any =
      await generateAccessAndRefreshTokens(user._id);
    loggedUser.password = undefined;
    loggedUser.refreshToken = undefined;
  
    const options = {
      httpOnly: true,
      secure: true
    };
  
    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: loggedUser, accessToken, refreshToken },
          "User logged in successfully"
        )
      );
  });

  const logoutUser = asyncHandler(async (req:any, res:Response) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1,
                },
            },
            { new: true }
        );
        
        const options:any = {
            httpOnly: true,
            secure: true,
            sameSite: 'None', // Ensure SameSite attribute is set for cookies
        };

        res.clearCookie("accessToken", options);
        res.clearCookie("refreshToken", options);

        console.log('Cookies cleared');
        
        return res.status(200).json(new ApiResponse(200, {}, "User logged out"));
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json(new ApiResponse(500, {}, "Internal Server Error"));
    }
});


  const refreshAccessToken = asyncHandler(async(req:Request,res:Response)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
      throw new ApiError(401,"Unauthorized Request");
    }
  
    try {
        if(!process.env.REFRESH_TOKEN_SECRET) return
      const decodedToken:any = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    
      const user:any = await User.findById(decodedToken?._id);
      if (!user) {
        throw new ApiError(401,"Invalid Refresh Token");
      }
    
      if (incomingRefreshToken !== user.refreshToken) {
        throw new ApiError(401,"Refresh Token is expired or used");
      }
    
      
      const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)
    
      const options = {
        httpOnly: true,
        secure: true,
      };
    
      res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(new ApiResponse(200,{accessToken,refreshToken},"Access Token Refreshed Successfully"));
      
    } catch (error:any) {
      throw new ApiError(401,error?.message || "Invalid Refresh Token");
    }
  })

  const getCurrentUser = asyncHandler(async(req:any,res:Response)=>{
    res.status(200).json(new ApiResponse(200,req.user,"Current User fetched Successfully"));
  })

  const changeCurrentUserPassword = asyncHandler(async(req:any,res:Response)=>{
    const {oldPassword,newPassword} = req.body;
    const user:any = await User.findById(req.user?._id).select("+password");
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  
    if (!isPasswordCorrect) {
      throw new ApiError(400,"Invalid old Password")
    }
  
    user.password = newPassword;
  
    await user.save({validateBeforeSave:false})
  
    return res.status(200).json(new ApiResponse(200,{},"Password Changed Successfully"));
  
  })

export { registerUser,loginUser,logoutUser,refreshAccessToken,getCurrentUser,changeCurrentUserPassword};