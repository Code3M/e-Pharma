import mongoose from "mongoose";
import { User } from "../models/user.js";
import asyncHandler  from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"



// New User Creation
const userSignUp = asyncHandler( async(req,res) =>{
    const {firstName,lastName,password,age,gender,email,mobile,role,gstNo,address} = req.body
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
        password,
        email,
        mobile,
        role,
        gstNo:gstNo || "",
        address:{
            city, state, pin, fullAddress
        }
    })

    const createdUser = await User.findOne(user._id).select(
        "-gstNo "
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
    const filter= {_id:req.user._id}
    const update = {$set:{}}
    updateElements.forEach((values)=>{
        if(req.body[values]){
            update.$set[values] = req.body[values]
        }
    })
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

//Change Password
const changePassword = asyncHandler((async(req,res)=>{

    const {email, oldPassword, newPassword} = req.body
    if(oldPassword === newPassword) return res.state(200).json(new ApiResponse(200,"No changes in Password"))
    if([oldPassword, newPassword].some((field)=>field.trim()===""))
        throw new ApiError(400, "Password requied")

    const user = await User.findOne(req.user._id)
    
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect){
        throw new ApiError(400,"Invalid Old Password")
    }
    user.password = newPassword
    await user.save({validateBeforeSave: false})
    
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))    
}))

//logIn
const login = asyncHandler((async(req,res)=>{
    const {email,mobile,password} =req.body
    const user = await User.findOne({
        $or:[{email},{mobile}]
    })

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid) {
        throw new ApiError(400, "Invalid user Credentials")
    }
    const accessToken = await user.generateAccessToken()

    const loggedInUser = await User.findOne(user._id).select("-gstNo")
    const option = {
        httpOnly : true,
        secure : true
    }
    res.status(200)
    .cookie("accessToken",accessToken,option)
    .json(new ApiResponse(200,{user:loggedInUser,accessToken},"User LoggedIn"))
}))

//logOut
const logout = asyncHandler((async(req,res) => {
    const name = req.user.firstName
    const option = {
        httpOnly : true,
        secure : true
    }
    res.status(200)
    .clearCookie("accessToken", option)
    .json(new ApiResponse(200,`Bye Bye ${name} see you soon`))

}))

// Delete User
const removeUser = asyncHandler(async(req,res) =>{

    await User.findOneAndDelete(req.user._id)
    res.status(200).json(new ApiResponse(200,`${req.user.firstName} Your account deleted successfully`))
})

// Get User
const getUser = asyncHandler(async(req,res)=>{
    const email = req.params.email
    const user = await User.find()
    res.status(200).json(new ApiResponse(200, user))
})




export  {
    userSignUp,
    editDetails,
    changePassword,
    login,
    logout,
    removeUser,
    getUser


}