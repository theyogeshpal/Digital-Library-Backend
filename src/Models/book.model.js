const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true 
},
  author: { 
    type: String, 
    required: true
},
  category: { 
    type: String, 
    required: true 
},
  rating: { 
    type: Number, 
    required: true 
},
  pages: { 
    type: Number, 
    required: true 
},
  language: { 
    type: String, 
    required: true 
},
  publishDate: { 
    type: Date, 
    required: true 
},
  isbn: { 
    type: String, 
    required: true 
},
  image: { 
    type: String, 
    required: true 
},
  imageid: {
    type: String,
    required: false
},
  bookPdf: { 
    type: String, 
    required: true 
},
  pdfid: {
    type: String,
    required: false
},
  description: { 
    type: String, 
    required: true 
},
  fullDescription: { 
    type: String, 
    required: true 
},
  createdAt: { 
    type: Date, 
    default: Date.now 
}
})


const book  = mongoose.model("book", bookSchema)

module.exports = book


