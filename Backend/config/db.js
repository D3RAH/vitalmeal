import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://d3r4:646911646911@cluster0.ncfgsii.mongodb.net/food-ordering-system').then(()=>console.log("DB connected"));
}