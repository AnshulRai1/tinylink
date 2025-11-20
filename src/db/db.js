import e from "cors";
import mongoose from "mongoose";

const connectDB =  async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_CONNECTION_URL)
        console.log(`\n MongoDB connected !! DB HOST : ${connection.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection failed",error);
        
    }
}

export default connectDB;