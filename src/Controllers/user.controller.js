const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const user = require('../Models/user.model')
const {uploadFile, deleteFile} = require('../services/storage.service')


const addUser = async (req, res) => {
    
    // console.log(req.body)
    const {fullname, username, email, dob, password, confirmPassword} = req.body

    if(password != confirmPassword){
        res.status(400).json({
            message: "Password and Confirm Did Not Match"
        })
    }
    
    const existUser = await user.findOne({email : email})

    if(existUser) {
        res.status(400).json({
            message: "user with this Email Already Exists",
            email
        })
    }
    const existUsername = await user.findOne({username : username})

    if(existUsername) {
        res.status(400).json({
            message: "user with this Username Already Exists",
            username : username
        })
    }

    // PASSWORD HASHING
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new user({
        fullname : fullname,
        username : username,
        email : email,
        dob : dob,
        password : hashedPassword    
    })  
    try {
        await newUser.save()

        res.status(200).json({
            status : "Success",
            message : "User Added",
            name : fullname
        })
    }
    catch(error){
        res.status(400).json({message : error.message})
    }
}

// user login api
const LoginUser = async (req, res) => {
    const {username, password} = req.body
    
    const checkUser = await user.findOne({username : username})

    if(!checkUser){
        return res.status(404).json({
            message : "user not found"
        })  
    }
    const checkPass = bcrypt.compareSync(password, checkUser.password);

        if(checkPass) {

            res.status(200).json({
            status : "Success",
            message : "User Logged In",
            user : username
            }) 
        }else {
            res.status(400).json({
                status : "Error",
                message : "Invalid Credentials"
        })
        
    }
}

//get all users
const getAllUsers = async (req,res) => {
    const allUsers = await user.find();

    console.log(allUsers)
    res.status(200).json({
        status : "Success",
        data : allUsers
    })
}

//get single user
const getSingleUser = async (req, res) => {
    // console.log(req.params.id)
    const singleUser = await user.find({username : req.params.username})

    if(singleUser.length > 0){
        res.status(200).json({
        status : "Success",
        data : singleUser
        })
    }
    else{
        res.status(400).json({
        status : "Failed",
        data : "User Not Found"
        })
    }
}

//upload user profile pic
const updateUser = async (req, res) => {

    const formdata = req.body
    const userdata =  await user.findOne({username : formdata.username}) 

    if(!userdata){
        return res.status(404).json({
            message : "user not found"
        })
    }
    
    if(userdata.photoid){
        const result = await deleteFile(userdata.photoid)
    }

    const result = await uploadFile(req.file.buffer)

    userdata.photo = result.url
    userdata.photoid = result.fileId

    await userdata.save()
    
    res.status(201).json({
        message : "Image saved successfully",
        result : result.url
    })
}

// update user profile
const updateProfile = async (req, res) => {

    const {username, fullname, email, bio} = req.body

    const userdata = await user.findOne({username : username})
    if(!userdata){
        return res.status(404).json({
            message : "user not found"
        })
    }

    try{
        userdata.fullname = fullname,
        userdata.email = email,
        userdata.bio = bio

        await userdata.save()
        // console.log(userdata)
        res.status(201).json({
            message : "profile updated successfully"
        })
    }
    catch(ex){
        res.status(404).json({
            message : ex.message
        })
    }
}

// delete user
const deleteUser = async (req, res) => {

    const id = req.params.id
    const data = user.findOne({
        _id : id
    })

    if(!data){
        res.status(404).json({
            message : "user not found"
        })
    }
    await user.findByIdAndDelete(id)
    res.status(200).json({
        message : "user deleted successfully"
    })

}

module.exports = {addUser, LoginUser, getAllUsers, getSingleUser, updateUser, updateProfile, deleteUser}

