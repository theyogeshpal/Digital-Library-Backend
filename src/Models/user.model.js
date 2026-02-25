const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true, 
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    dob : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    photo : {
        type : String,
        required : false
    },
    bio : {
        type : String,
        required : false
    }
})


const user = mongoose.model("user", userSchema)


module.exports = user

