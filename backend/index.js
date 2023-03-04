require("dotenv").config();

const express= require ("express");
const cors= require("cors");
const connect= require("./src/config/db");

const app = express();
const PORT= process.env.PORT;
app.use(cors());
app.use(express.json());


app.listen(PORT,async()=>{
    await connect();
    console.log("http://localhost:8080/")
})