const user = require('../Models/user.model')

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
    const newUser = new user({
        fullname,
        username,
        email,
        dob,
        password    
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
    
    const checkUser = await user.findOne({username : username , password : password })

        if(checkUser) {
            res.json({
            status : "Success",
            message : "User Logged In",
            user : username
        }) 
        }else {
            res.json({
                status : "Error",
                message : "Invalid Credentials"
        })
        
    }
}

module.exports = {addUser, LoginUser}

