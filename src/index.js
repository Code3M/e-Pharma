import express from "express"
import 'dotenv/config'
import dbConnect from "./DB/index.js";
import cors from 'cors'
import cookiParser from 'cookie-parser'


const app = express()
app.listen(process.env.PORT || 3737 ,() =>{
    console.log(`Server Running at ${process.env.PORT}`);
})

dbConnect()
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended: true,limit : "56kb"}))
app.use(cookiParser())

import { userRouters } from "./routes/userRoutes.js";
app.use("/epharma/v1", userRouters)
