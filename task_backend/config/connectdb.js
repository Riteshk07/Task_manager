import mongoose from "mongoose";

const connectDb = async (DATABASE_URL) => {
    try{
        const DB_OPTION = {
            dbName:"taskmanage"
        }
        await mongoose.connect(DATABASE_URL, DB_OPTION);
        console.log("Connected Successfully! ");
    }catch(err){
        console.log(err);
    }
}

export default connectDb;