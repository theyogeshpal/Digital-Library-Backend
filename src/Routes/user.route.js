const express = require('express')
const userController = require('../Controllers/user.controller')
const router = express.Router()
const multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() })

router.post("/user", userController.addUser)

router.post("/user/login", userController.LoginUser)

router.get("/users", userController.getAllUsers)

router.get("/user/:username", userController.getSingleUser)

router.post("/update/photo",upload.single('photo'), userController.updateUser)

router.put("/user/update", userController.updateProfile)

router.delete("/user/delete/:id", userController.deleteUser)

module.exports = router


