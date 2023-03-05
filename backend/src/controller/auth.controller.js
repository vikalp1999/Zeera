const UserModel = require("../model/userTask.model")
const jwt= require("jsonwebtoken")
exports.AuthSignup = async (req,res) => {
    let{email, password, name}=req.body;
    try {
        const user = await UserModel.findOne({email})
        if(user){
            return res.status(203).send({
                error:true,
                msg:'Email already registered'
            })
        } else {
            const newUser = new UserModel({email, password, name})
            await newUser.save()
            return res.status(201).send({
                error:false,
                user:newUser
            })
        }
    } catch (error) {
        return res.status(400).send( {
            error:true,
            msg:error
        })
    }
}

exports.AuthLogin = async (req,res)=>{
    let {email, password}= req.body;
    try {
        const user = await UserModel.findOne({email, password}).populate(["mainTask","soloTask", "currentChatroom"])
        if(!user){
            return res.status(401).send({
                error:true,
                msg:'User not found'
            })
        } else {
            delete user.password
            const token= jwt.sign({
                ...user
            },"VIKALP@99",{
                expiresIn:"7 days"
            })
            const refreshToken=jwt.sign({id:user._id},"REFRESHSECRET",{
                expiresIn:"28 days"
            })
            return res.status(200).send({error:false,
                user:user,
                token,
                refreshToken})
        }
    } catch (error) {
        return res.status(400).send({
            error:true,
            msg:error
        })
    } 
}

