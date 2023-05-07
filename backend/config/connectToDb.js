import mongoose from "mongoose";
import * as dotenv from "dotenv"
dotenv.config()

async function connectToDb() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("connected");
    }
    catch(err) {
        console.log(err);
    }
}

export {connectToDb}
