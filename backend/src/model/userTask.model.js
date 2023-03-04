const mongoose = require("mongoose");


const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
       type:String,
       enum:["lead","user"],
       default:"user" 
    },
    mainTask:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"task"
            }
        ]
    },
    soloTask:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"task"
            }
        ]
    },
    currentChatroom:{
        type:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"chatroom"
        }
    },
    online:{
        type:Boolean,
        default:false
    },
    socket:{
        type:String,
        default:''
    }
})


const UserModel= mongoose.model("user",userSchema);
module.exports= UserModel
