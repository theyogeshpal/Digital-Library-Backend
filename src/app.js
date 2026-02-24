const express = require('express')
const userRoutes = require('./Routes/user.route') 
const cors = require('cors')
require('dotenv').config(); 

const app = express()
app.use(express.json())
app.use(cors()) 

app.use('/api', userRoutes)

module.exports = app
