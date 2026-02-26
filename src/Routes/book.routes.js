const express = require('express');
const bookController = require('../Controllers/book.controller')
const multer = require('multer');

const router = express.Router();


// Configure storage
const upload = multer({ storage: multer.memoryStorage() });

// Define which fields to expect
const bookUpload = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'bookPdf', maxCount: 1 }
]);


router.post('/add',bookUpload, bookController.addBook)

router.get('/show', bookController.showBook)

router.get('/show/:id', bookController.getSingleBook)

router.delete('/delete/:id', bookController.deleteBook)

module.exports = router;
