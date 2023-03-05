require("dotenv").config();

const express= require ("express");
const cors= require("cors");
const connect= require("./src/config/db");
const chatRoom= require("./src/route/chatroom.route");
const Auth= require("./src/route/auth.route");
const task= require("./src/route/task.route")

const app = express();
const PORT= process.env.PORT;
app.use(cors());
app.use(express.json());

app.use("/chatroom",chatRoom);
app.use("/auth",Auth);
app.use("/task",task)


app.listen(PORT,async()=>{
    await connect();
    console.log("http://localhost:8080/")
})