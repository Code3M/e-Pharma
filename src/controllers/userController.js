import mongoose from "mongoose";
import { User } from "../models/user.js";
import asyncHandler  from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"


// New User Creation
const userSignUp = asyncHandler( async(req,res) =>{
    const {firstName,lastName,age,gender,email,mobile,role,gstNo,address} = req.body
    const {city, state, pin, fullAddress} = address
    if ([firstName, age, gender, email, mobile, role, city, state, pin, fullAddress].some((field) => typeof field === 'string' && field.trim() === '')) {
        throw new ApiError(400, "All fields are Required");
    }
    // Check if user existed
    const existedUser = await User.findOne({
        $or:[{email, mobile}]
    })
    if(existedUser) throw new ApiError(400, "User alredy present")

    const user = await User.create({
        firstName,
        lastName,
        age,
        gender,
        email,
        mobile,
        role,
        gstNo:gstNo || "",
        address:{
            city, state, pin, fullAddress
        }
    })

    const createdUser = await User.findOne(user._id).select(
        "-gstNo"
    )
    

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    else{
        return res.status(201).json(new ApiResponse(200, createdUser, "User registered Successfully"))
    }
    
})

// Update User
const editDetails = asyncHandler(async(req,res)=>{
    const updateElements = ['firstName','lastName','email','age','gender','email','mobile','role','gstNo','address']
    const filter= {email:req.params.id}
    console.log(filter);
    const update = {$set:{}}
    updateElements.forEach((values)=>{
        if(req.body[values]){
            update.$set[values] = req.body[values]
        }
    })
   // console.log(update);
    try {
        const user = await User.findOneAndUpdate(filter,update,{new:true})
        console.log(user);
        //res.status(204).json(new ApiResponse(200,))
         res.status(200).json(new ApiResponse(200, user,"Updation success"))
    } catch (error) {
        console.log('Something Went wrong :'+error);
        throw new ApiError(500, "Updation Failed")
    }
    
})

// Delete User
const removeUser = asyncHandler((req,res) =>{

})


// Get User
const getUser = asyncHandler((req,res)=>{

})




export  {
    userSignUp,
    editDetails,

}