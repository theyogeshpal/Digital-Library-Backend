const mongoose = require('mongoose')

const likeBookSchema = new mongoose.Schema({
    userid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    bookid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
    },
})


const likeBook = mongoose.model("likeBook", likeBookSchema)

module.exports = likeBook
