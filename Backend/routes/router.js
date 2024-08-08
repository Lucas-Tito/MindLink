//centralizer file for others routes
//you only need to import this file in the app.js, instead of importing all routes
import express from "express";

const router = express.Router()

//routers
import userRouter from "./userRouter.js"
import userConnectionRouter from "./usersConnetionRouter.js"
import appointmentRouter from "./appointmentRouter.js"
import messagesRouter from "./messagesRouter.js"

router.use("/", userRouter)
router.use("/", userConnectionRouter)
router.use("/", appointmentRouter)
router.use("/", messagesRouter)

export default router