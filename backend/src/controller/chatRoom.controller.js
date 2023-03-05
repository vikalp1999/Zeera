const ChatRoom= require("../model/chatRoommodel");
const UserModel= require("../model/userTask.model");

exports.newChatRoom= async(req,res)=>{
    const {lead, name} = req.body;
    try{
        let chatroom = await ChatRoom.create({roomLead:lead, name})
        let user = await UserModel.findByIdAndUpdate(lead, {$set: {currentChatroom:chatroom._id}}, {new:true})
        chatroom = await ChatRoom.findById(chatroom._id).populate("roomLead")
        let user1 = await UserModel.findByIdAndUpdate(lead, {currentChatroom:chatroom._id, role:'admin'}, {new:true})
       return res.status(200).send({
        error:false,
        chatroom,
        code:chatroom._id,
        user:user1
    })
    }
    catch(err){
       res.status(400).send({
        error:true,
        msg:error
    })
    }
}

exports.joinChatRoom= async(req,res)=>{
    const {id} = req.params;
    const {user} = req.body;
  try{
    const chatroom = await ChatRoom.findOne({_id:id})
        if(chatroom){
            let arr = [...chatroom.members]
            if(arr.includes(user) || chatroom.roomLead==user){
                return {
                    error:true,
                    msg:'User already present in this chat room'
                }
            }
            arr.push(user)
            let upUser = await UserModel.findByIdAndUpdate(user, {currentChatroom:chatroom._id})
            const update = await ChatRoom.findByIdAndUpdate(
                id,
                { $set: { members:arr } },
                { new: true }
            ).populate(["members", "roomLead", "alltasks", {path:"members", populate:{path:"soloTask"}}, {path:"members", populate:{path:"mainTask"}}, "messages" ])
            
            return res.status(200).send({
                error:false,
                chatroom:update
            })
        } else {

            return res.status(400).send({
                error:true,
                msg:'Invalid invite code'
            })
        }
}
catch(err){

}
}

exports.getChatroom= async(req,res)=>{
    const {id} = req.params
    try{
        const update = await ChatRoom.findById(id)
        .populate([
            "members", 
            "roomLead", 
            {path:"alltasks",populate:{path:"assignee"}}, 
            {path:"members", populate:{path:"soloTask"}}, 
            {path:"members", populate:{path:"mainTask"}}, 
            "messages",
            {path:"messages", populate:{path:"sender"}}
        ])

        if(update) {
           return res.status(201).send({
            error:false, 
            chatroom:update
        })
        } else {
            return res.status(400).send({
                error:true, 
                msg:"Chatroom not found"
            })
        }

    }
    catch(err){

    }
}