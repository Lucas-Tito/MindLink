import express from "express";

const router = express.Router()

import userController from "../controllers/userController.js"

import userPatientSelector from "../selectors/userProfessionalSelector.js"

import userProfessionalSelector from "../selectors/userProfessionalSelector.js"

import userPatientBuilder from "../builders/userPatientBuilder.js"

import userProfessionalBuilder from "../builders/userProfessionalBuilder.js"

//PatientUser

router.route("/usersPatient").get((req, res) =>userPatientSelector.getAllUsers(req, res))

router.route("/usersPatient").post((req, res) =>userPatientBuilder.createUser(req, res))

router.route("/usersPatient/:id").get((req, res) =>userPatientSelector.getUserById(req, res))

//ProfessionalUser

router.route("/usersProfesional").get((req, res) =>userProfessionalSelector.getAllUsers(req, res))

router.route("/usersProfesional").post((req, res) =>userProfessionalBuilder.createUser(req, res))

router.route("/usersProfesional/:id").get((req, res) =>userProfessionalSelector.getUserById(req, res))

export default router