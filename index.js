const express = require("express");
const app = express();
require('dotenv').config()
const { default: mongoose } = require("mongoose");
const user = require("./routers/user.js");


mongoose.connect(process.env.DB_URL);
mongoose.connection.on("open",()=>{
    console.log("Db connected successfully ");
});
mongoose.connection.on("error",()=>{
    console.log("Db connection failed");
})

// ======== middleware ============
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/",user);
app.use((req,res,next)=>{
    res.status(404).json("Page not found")
})

const port = process.env.port || 5000;
app.listen(port,()=>console.log(`Server is running...${port}`));