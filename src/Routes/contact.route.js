const express = require('express')
const contactController = require('../Controllers/contact.controller')

const router = express.Router()



router.post('/contact', contactController.contactform)


module.exports = router

