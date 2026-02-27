const book = require('../Models/book.model');
const likeBook = require('../Models/likeBook.model')

const like = async (req, res) => {

    const {uname, bid} = req.body

    const likeddata = await likeBook.findOne({username : uname, bookid : bid})
    const bookdata = await book.findOne({_id : bid})

    if(!likeddata){
        const like = new likeBook({
            username : uname,
            bookid : bid
        }) 

        await like.save()
        bookdata.likeCount++;
        await bookdata.save()

        res.status(200).json({
        message : "Book Liked Successfully"
        })
    }
    else{
        await likeBook.findByIdAndDelete(likeddata._id)

        bookdata.likeCount--;
        await bookdata.save()

        res.status(200).json({
        message : "Book UnLiked Successfully"
        })
    }
}

// get all liked books
const getLikedBooks = async (req, res) => {
        const username = req.params.username

        const likedbooks = await likeBook.find({username : username}).populate('bookid')
        
        if(likedbooks){
            res.status(200).json({
            data : likedbooks
            })
        }
        else{
            res.status(404).json({
                message : "No Liked Books Found"
            })
        }

}

module.exports = { like , getLikedBooks} 

