require('dotenv').config();
const { ImageKit } = require("@imagekit/nodejs")

// Fallback configuration for ImageKit
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(buffer) {

    console.log(buffer);

    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName: "image.jpg"
    })

    return result;

}


const deleteFile = async (fileId) => {
    try {
        // ImageKit ka internal method .deleteFile()
        const response = await imagekit.deleteFile(fileId);
        
        return { success: true, response };
    } catch (error) {
        console.error("ImageKit Delete Error:", error.message);
        
        // Agar file pehle hi delete ho chuki hai toh error handle karein
        return { success: false, error: error.message };
    }
};

module.exports = {uploadFile, deleteFile};
