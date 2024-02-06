import { Router } from "express";


const userRouters = Router()
userRouters.route("/registerNewUser").post()
userRouters.route("/").post()