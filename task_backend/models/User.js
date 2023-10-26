import mongoose from "mongoose";

// Defining Schema
const userSchema = new mongoose.Schema({
    role:{type:String , required:true, trim:true},
    name:{type:String , required:true, trim:true},
    email:{type:String , required:true, trim:true},
    password:{type:String , required:true, trim:true},
    tc:{type:String , required:true, trim:true}
});

// model
const UserModel = mongoose.model("user", userSchema);

export default UserModel;