const express = require('express')
const userController = require('../Controllers/user.controller')
const router = express.Router()

router.post("/user", userController.addUser)

router.post("/user/login", userController.LoginUser)

router.get("/users", userController.getAllUsers)

router.get("/user/:username", userController.getSingleUser)

router.post("/update/photo", userController.updateUser)

module.exports = router


