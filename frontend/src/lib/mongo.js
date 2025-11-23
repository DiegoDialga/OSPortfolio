import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI){
    throw new Error("MongoDB URI doesn't exist");
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
