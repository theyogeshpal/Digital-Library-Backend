const express = require('express')
const likeController = require('../Controllers/likeBook.controller')

const router = express.Router()

router.post('/like', likeController.like)

router.get('/likedbooks/:username', likeController.getLikedBooks)

module.exports = router

