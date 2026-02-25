const express = require('express')
const userRoutes = require('./Routes/user.route')
const contactRoutes = require('./Routes/contact.route')
const adminRoutes = require('./Routes/admin.route')
const cors = require('cors')
const multer = require('multer')
require('dotenv').config(); 

const app = express()
app.use(express.json())
app.use(cors()) 

const upload = multer({ storage: multer.memoryStorage() })

app.use('/api', upload.single('photo') , userRoutes)
app.use('/api', contactRoutes)
app.use('/api/admin', adminRoutes)

module.exports = app
