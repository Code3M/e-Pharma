import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
import asyncHandler from './asyncHandler.js';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});



const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"image",
            folder: "epharma" // Specifing the folder of Cloudinary
        })
        console.log("File is uploaded on Cloudinary", response.url);
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        // to remove file from local 

        return null;
    }
}
const replaceOnCloudinary = async(newImageUrl,EXISTING_PUBLIC_ID) =>{
    try {
      const response = await cloudinary.uploader.upload(newImageUrl, { 
        public_id: EXISTING_PUBLIC_ID, 
        overwrite: true, 
        resource_type: 'image' 
      })
      console.log(response);
      fs.unlinkSync(newImageUrl)
      return response
    } catch (error) {
      fs.unlinkSync(newImageUrl)
      return error;
    }
}

export {uploadOnCloudinary,replaceOnCloudinary}