//centralizer file for others routes
//you only need to import this file in the app.js, instead of importing all routes
import express from "express";

const router = express.Router()

//routers
import userRouter from "./userRouter.js"

router.use("/", userRouter)

export default router