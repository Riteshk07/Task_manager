import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task: {type:String, required:true, trim:true},
    startdate:{type:Date},
    deadline:{type:Date},
    status:{type:String, required:true, trim:true}
});

const TaskModel = mongoose.model("task", taskSchema);

export default TaskModel;