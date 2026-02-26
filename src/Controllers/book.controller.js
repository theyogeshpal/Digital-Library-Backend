const book = require('../Models/book.model')
const {uploadFile} = require('../services/storage.service')

const addBook = async (req,res) => {

    const photo = req.files['image'][0].buffer
    const pdf = req.files['bookPdf'][0].buffer

    try{
        const imageResponse = await uploadFile(photo)
        const pdfResponse = await uploadFile(pdf)

        const newBook = new book({
            title : req.body.title,
            author : req.body.author,
            rating : req.body.rating,
            pages : req.body.pages,
            language : req.body.language,
            publishDate : req.body.publishDate,
            isbn : req.body.isbn, 
            description : req.body.description,
            category : req.body.category,
            image : imageResponse.url,
            imageid : imageResponse.fileId,
            bookPdf : pdfResponse.url,
            pdfid : pdfResponse.fileId,
            fullDescription : req.body.fullDescription
        })

        await newBook.save()

    }
    catch(e){
        console.log(e.message)
        
        return res.status(400).json({
            message: "error while adding"
        })
    }
    
    res.status(200).json({
        status : "Success",
        message : "Book Added"
    })
}


const showBook = async (req,res) => {
    try {
        const data = await book.find()

        res.status(200).json({
            status : "Success",
            data : data
        })
    }
    catch(e){
        console.log(e.message)
    }
}

const getSingleBook = async (req, res) => {
    const id = req.params.id
    try{
        const data = await book.findById(id)
        res.status(200).json({
            status : "Success",
            data : data
        })
    }
    catch(e){
        console.log(e.message)
        res.status(404).json({
            status : "Failed",
            message : "Book not found"
        })
    }

}

module.exports = {addBook, showBook, getSingleBook}