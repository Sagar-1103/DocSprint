import mongoose from "mongoose";

const connectDB = async():Promise<void>=>{
    try {
         if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in the environment variables.");
        }
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/docsprint`);
        console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Failed : ",error);
        process.exit(1)
    }
}

export default connectDB;
