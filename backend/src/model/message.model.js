const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    msg: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "chatroom" },
   
  },
  { timestamps: true }
);

const MessageSchema = mongoose.model("message", messageSchema);

module.exports = MessageSchema;