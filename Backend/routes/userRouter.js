import express from "express";

const router = express.Router()

import userController from "../controllers/userController.js"

router.route("/users").get((req, res) =>userController.getAllUsers(req, res))

router.route("/users").post((req, res) =>userController.createUser(req, res))

router.route("/users/:id").get((req, res) =>userController.getUserById(req, res))

export default router