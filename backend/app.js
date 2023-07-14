const fs = require("fs")
const express = require("express");
const app = express();
const auth = require("./Router/auth");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,Cookies,X-email");
    next();
})
app.use(express.json())
app.use(morgan("dev"))
app.use("/auth",auth)
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.sendFile("./db.json",{root:__dirname})
})

app.post("/",(req,res)=>{
    const {name,age,position} = req.body
    console.log("post request : " + name , age , position)
    res.send("requst successfully arrived")
})

app.listen(3002,()=>{
    console.log("server is running on port 3002")
})