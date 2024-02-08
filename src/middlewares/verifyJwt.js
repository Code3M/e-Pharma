import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.js";
import { ApiResponse } from "../utils/ApiResponse.js";
 const verifyJwt = asyncHandler(async(req,res,next)=>{
    try {
        const token = await req.cookies?.accessToken||
        req.header("Authorization")?.replace("Bearer ","")
        if(!token) return res.json(new ApiResponse(200,{},"Please LogIn"))

        const decodToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodToken._id)

        if(!user) throw new ApiError(401,"Invalid Token")

        req.user = user
        next()

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})

export default verifyJwt