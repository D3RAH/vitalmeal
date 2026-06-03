import foodModel from "../models/foodModel.js";
import { v2 as cloudinary } from 'cloudinary';

// add food item 
const addFood = async (req,res) => {

    let image_filename = req.file.path;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    }catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }

}

// all food list
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    }catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

// remove food item
const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (food.image && food.image.includes('cloudinary')) {
            const publicId = food.image.split('/').slice(-1)[0].split('.')[0];
            await cloudinary.uploader.destroy(`vitalmeal/${publicId}`);
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addFood,listFood,removeFood};