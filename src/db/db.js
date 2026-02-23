const mongoose = require('mongoose')

const connectDb = async () => {
 await mongoose.connect("mongodb+srv://core_archive:S6gPRMJeMvtHAP2M@yogeshpal1309.gifxhgo.mongodb.net/core_archive")
} 



module.exports = connectDb