import express from "express"
import 'dotenv/config'
import dbConnect from "./DB/index.js";

const app = express()
app.listen(process.env.PORT || 3737 ,() =>{
    console.log(`Server Running at ${process.env.PORT}`);
})

dbConnect()

