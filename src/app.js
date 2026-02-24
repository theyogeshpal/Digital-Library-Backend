const express = require('express')
const userRoutes = require('./Routes/user.route') 
const cors = require('cors')
const multer = require('multer')
require('dotenv').config(); 

const app = express()
app.use(express.json())
app.use(cors()) 

const upload = multer({ storage: multer.memoryStorage() })

app.use('/api', upload.single('photo') , userRoutes)

module.exports = app
