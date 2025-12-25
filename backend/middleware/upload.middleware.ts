import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'crime-reporting',
            resource_type: 'auto',    
            allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'mp4', 'mov', 'pdf', 'doc', 'docx'],
            public_id: file.fieldname + '-' + Date.now() 
        };
    },
});


export const uploadCloud = multer({ 
    storage: storage,
    limits: { fileSize: 20 * 1024 * 1024 } 
}).array('files', 10); 


export const uploadSingleCloud = multer({
    storage: storage
}).single('anh');