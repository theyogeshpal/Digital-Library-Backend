const express = require('express')
const userRoutes = require('./Routes/user.route')
const contactRoutes = require('./Routes/contact.route')
const adminRoutes = require('./Routes/admin.route')
const bookRoutes = require('./Routes/book.routes')

const cors = require('cors')

require('dotenv').config(); 

const app = express()
app.use(express.json())
app.use(cors()) 


// user api
app.use('/api' , userRoutes)
// contact api
app.use('/api', contactRoutes)
// admin api
app.use('/api/admin', adminRoutes)
// book api
app.use('/book', bookRoutes)

module.exports = app
