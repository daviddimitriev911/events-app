import mongoose from "mongoose";

const {MONGO_URI, DB_NAME} = process.env;

if(!MONGO_URI){
    throw new Error("Please define MONGO_URI environment");
}

async function dbConnect(){
    if(mongoose.connection.readyState !== 1){
        try {
            await mongoose.connect(MONGO_URI, {
                dbName: DB_NAME,
                bufferCommands: true,
            });
            console.log("Db is connected!");
        } catch (error) {
            console.error("Db is not connected!", error)
        }
    }else{
        console.log("Db is already connected!");
    }
}

export default dbConnect;