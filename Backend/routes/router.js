//centralizer file for others routes
//you only need to import this file in the app.js, instead of importing all routes
import express from "express";

const router = express.Router()

//routers
import userRouter from "./userRouter.js"
import userConnectionRouter from "./usersConnetionRouter.js"

router.use("/", userRouter)
router.use("/", userConnectionRouter)

export default router