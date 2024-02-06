import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const dbConnect = async() => {
    try {
         const dbInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
         console.log(`DB Hosted at :${dbInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection Failuar: ", error);
        process.exit(1);
    }
}

export default dbConnect