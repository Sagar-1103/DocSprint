import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  username: string;
  email: string;
  fullname: string;
  avatar: string;
  password: string;
  refreshToken:string;
  role:string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    fullname: {
      type: String,
      trim: true,
      required: [true, "Full Name is required"],
    },
    avatar: {
      type: String,
      required: [true, "Avatar is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },
    refreshToken: {
        type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save",async function(next){
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password:string): Promise<boolean> {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function():string{
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error("ACCESS_TOKEN_SECRET is not defined in environment variables");
    }
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function():string{
    if (!process.env.REFRESH_TOKEN_SECRET) {
        throw new Error("REFRESH_TOKEN_SECRET is not defined in environment variables");
    }
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
