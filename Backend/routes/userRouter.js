import express from "express";

const router = express.Router()

import userController from "../controllers/userController.js"

router.route("/users").post((req, res) =>userController.create(req, res))

export default router