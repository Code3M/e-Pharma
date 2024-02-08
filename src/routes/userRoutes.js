import express,{ Router } from "express";
import verifyJwt  from "../middlewares/verifyJwt.js";
import { userSignUp,
    editDetails,
    changePassword,
    login,
    logout,
    removeUser,
    getUser,
    getOneUser } from "../controllers/userController.js";


const userRouters = Router()

userRouters.route("/signUp").post(userSignUp)
userRouters.route("/logIn").post(login)
userRouters.route("/userUpdate").put(verifyJwt, editDetails)
userRouters.route("/forgot_password").post(verifyJwt, changePassword)
userRouters.route("/logOut").get(verifyJwt, logout)
userRouters.route("/deleteAccount").delete(verifyJwt, removeUser)
userRouters.route("/findUser").get(getUser)
userRouters.route("/findOneUser/:id").get(getOneUser)

export {userRouters}