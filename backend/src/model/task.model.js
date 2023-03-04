const mongoose = require("mongoose");

const taskSchema= mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["done","inprogress","todo"],
        default:"todo"
    },
    deadline:{
        type:String,
        required:true,
    },
    assigner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    assignee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})


const TaskModel= mongoose.model("task",taskSchema);
module.exports= TaskModel