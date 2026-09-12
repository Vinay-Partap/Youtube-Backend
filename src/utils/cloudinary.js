import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (filePath, folder) => {
    try{
        if(!fs.existsSync(filePath)) {
            throw new Error("File does not exist");
        }

        const result = await cloudinary.uploader.upload(filePath, {
            folder: folder,
            resource_type: "auto"
        });
        console.log("File uploaded to Cloudinary:", result.secure_url);

        return result;

    }catch(error) {
        fs.unlinkSync(filePath); // Delete the file from local storage if upload fails
        console.error("Error uploading file to Cloudinary:", error);
        throw error;
    }
};

const deleteFromCloudinary = async (publicId) => {
    try{
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("File deleted from Cloudinary:", result);
        return result;
    }catch(error) {
        console.error("Error deleting file from Cloudinary:", error);
        throw error;
    }
};

export {uploadOnCloudinary, deleteFromCloudinary};