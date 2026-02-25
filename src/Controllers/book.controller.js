const book = require('../Models/book.model')

const addBook = async (req,res) => {

    console.log(req.body)

    res.send({
        body : req.body
    })

}
module.exports = {addBook}