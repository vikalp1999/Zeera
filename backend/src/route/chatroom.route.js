const express= require("express");
const { newChatRoom, joinChatRoom, getChatroom } = require("../controller/chatRoom.controller");

const Router= express.Router();

Router.route("/new").post(newChatRoom)
Router.route("/join/:id").post(joinChatRoom)
Router.route("/:id").post(getChatroom)
module.exports= Router;