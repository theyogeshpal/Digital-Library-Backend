const contact = require('../Models/contact.model')


const contactform = async (req, res) => {

    const {name,email,subject,message} = req.body
    if(name == null || email == null){
        return res.status(400).json({
            success: false,
            message: "Please fill required fields"
        })
    }

    const result = await contact.create(req.body)
    
    return res.status(200).json({
        success: true
    })

}


module.exports = {contactform}
