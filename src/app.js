const express = require('express')
const userRoutes = require('./Routes/user.route')
const contactRoutes = require('./Routes/contact.route')
const adminRoutes = require('./Routes/admin.route')
const bookRoutes = require('./Routes/book.routes')

const cors = require('cors')
const multer = require('multer')
require('dotenv').config(); 

const app = express()
app.use(express.json())
app.use(cors()) 

const upload = multer({ storage: multer.memoryStorage() })

// user api
app.use('/api', upload.single('photo') , userRoutes)
// contact api
app.use('/api', contactRoutes)
// admin api
app.use('/api/admin', adminRoutes)
// book api
app.use('/api', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'bookPdf', maxCount: 1 }
]) , bookRoutes)

module.exports = app
