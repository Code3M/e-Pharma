import express,{ Router } from "express";
import { editDetails, userSignUp } from "../controllers/userController.js";


const userRouters = Router()

userRouters.route("/signUp").post(userSignUp)
userRouters.route("/userUpdate/:id").put(editDetails)

export {userRouters}