const express = require('express');
const bookController = require('../Controllers/book.controller')

const router = express.Router();

router.post('/book/add', bookController.addBook)

module.exports = router;
