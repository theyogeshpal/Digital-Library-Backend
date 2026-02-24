const express = require('express')
const userController = require('../Controllers/user.controller')

const router = express.Router()

router.post("/user", userController.addUser)

router.post("/user/login", userController.LoginUser)

router.get("/users", userController.getAllUsers)



module.exports = router


