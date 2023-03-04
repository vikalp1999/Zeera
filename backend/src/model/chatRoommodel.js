const mongoose= require("mongoose");

const chatRoomSchema= mongoose.Schema({
    roomLead:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"user",
     required:true
    },
    name:{
     type:String,
     required:true
    },
    members:{
     type:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:"user"
     }]
    },
    alltasks:{
     type:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:"task" 
     }]
    },
    messages:{
     type:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:"message"
     }]
    }
 })
 
 const ChatRoomModel= mongoose.model("chatroom",chatRoomSchema);
 module.exports=ChatRoomModel
 