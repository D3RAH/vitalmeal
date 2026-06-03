import express from 'express';
import { addFood,listFood,removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'vitalmeal',
        allowed_formats: ['jpg', 'jpeg', 'png'],
    }
});

const upload = multer({ storage: storage });

const foodRouter = express.Router();


foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);




export default foodRouter;