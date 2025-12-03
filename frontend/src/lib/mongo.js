import mongoose from "mongoose";
import {MONGODB_URI} from "../components/utils/URL";

if(!MONGODB_URI){
    console.log("MongoDB URI doesn't exist");
}

export async function connectToDatabase(){
    try{
        if(mongoose.connection.readyState === 1) return mongoose.connection;
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to MongoDB");
        return mongoose.connection;
    }catch(err){
        console.log("MongoDB connection failed");
        throw err;
    }
}
