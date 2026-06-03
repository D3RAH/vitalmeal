import 'dotenv/config';
import mongoose from 'mongoose';
import foodModel from './models/foodModel.js';


import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Connect to MongoDB with timeout options
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://d3r4:646911646911@cluster0.ncfgsii.mongodb.net/food-ordering-system?retryWrites=true&w=majority', {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
        });
        console.log("✅ DB Connected successfully!");
    } catch (error) {
        console.error("❌ DB Connection failed:", error.message);
        process.exit(1);
    }
}

// VitaMeal Food Data
const vitalMealFoods = [
    // RICE
    { name: "Chinese Rice", description: "Fried rice with mixed vegetables. High in carbs for energy, contains fiber and vitamins", price: 2200, category: "Rice", image: "food_1.png" },
    { name: "Jollof Rice", description: "Classic Nigerian jollof with tomato sauce. Rich in carbs, vitamins A & C from tomatoes", price: 2400, category: "Rice", image: "food_2.png" },
    { name: "Coconut Rice", description: "Rice in coconut milk with spices. Provides healthy fats and sustained energy", price: 2100, category: "Rice", image: "food_3.png" },
    { name: "Ofada Rice", description: "Local rice with green pepper sauce. High in fiber, aids digestion and heart health", price: 2800, category: "Rice", image: "food_4.png" },
    
    // SOUPS
    { name: "Efo Riro", description: "Spinach stew with assorted meat. Rich in iron, vitamins A, C, and protein", price: 2300, category: "Soups", image: "food_5.png" },
    { name: "Egusi Soup", description: "Melon seed soup with vegetables. High in protein, healthy fats and minerals", price: 2500, category: "Soups", image: "food_6.png" },
    { name: "Banga Soup", description: "Palm nut soup with catfish. Contains healthy oils, omega-3 and vitamins", price: 2700, category: "Soups", image: "food_7.png" },
    { name: "Pepper Soup", description: "Spicy goat meat soup with herbs. Boosts immunity and aids digestion", price: 2000, category: "Soups", image: "food_8.png" },
    
    // SWALLOW
    { name: "Pounded Yam & Egusi", description: "Smooth pounded yam with egusi soup. High in carbs, fiber and complete protein", price: 3000, category: "Swallow", image: "food_9.png" },
    { name: "Eba & Efo Riro", description: "Garri eba with vegetable soup. Good source of energy, iron and vitamins", price: 2500, category: "Swallow", image: "food_10.png" },
    { name: "Amala & Ewedu", description: "Yam flour with jute leaf soup. Rich in fiber, aids digestion and gut health", price: 2600, category: "Swallow", image: "food_11.png" },
    { name: "Fufu & Okra Soup", description: "Cassava fufu with okra soup. Provides energy, mucilage for digestive health", price: 2800, category: "Swallow", image: "food_12.png" },
    
    // GRILLS
    { name: "Grilled Chicken", description: "Seasoned grilled chicken. High in lean protein, supports muscle growth", price: 3500, category: "Grills", image: "food_13.png" },
    { name: "Grilled Tilapia", description: "Whole grilled tilapia with peppers. Rich in omega-3, protein and minerals", price: 4000, category: "Grills", image: "food_14.png" },
    { name: "Asun (Goat Meat)", description: "Spicy grilled goat meat. High in protein, iron and vitamin B12", price: 3800, category: "Grills", image: "food_15.png" },
    { name: "Peppered Gizzard", description: "Spicy grilled gizzard. Good source of protein, zinc and B vitamins", price: 2500, category: "Grills", image: "food_16.png" },
    
    // NIGERIAN SPECIALS
    { name: "Moi Moi", description: "Steamed bean pudding with eggs. High in plant protein and fiber", price: 1500, category: "Nigerian Specials", image: "food_17.png" },
    { name: "Pap & Bean Cake", description: "Corn pudding with fried bean cakes. Provides energy and essential nutrients", price: 1200, category: "Nigerian Specials", image: "food_18.png" },
    { name: "Suya", description: "Spicy grilled beef skewers. Rich in protein, iron and B vitamins", price: 2000, category: "Nigerian Specials", image: "food_19.png" },
    { name: "Plantain & Beans", description: "Ripe plantain with beans stew. Balanced carbs, fiber and plant protein", price: 1800, category: "Nigerian Specials", image: "food_20.png" },
    
    // PASTA
    { name: "Cheese Pasta", description: "Creamy cheese pasta. Good source of calcium, protein and energy", price: 2500, category: "Pasta", image: "food_21.png" },
    { name: "Tomato Pasta", description: "Classic pasta in tomato sauce. Contains lycopene and antioxidants", price: 2300, category: "Pasta", image: "food_22.png" },
    { name: "Creamy Pasta", description: "Fettuccine in white sauce with chicken. High in protein and calcium", price: 2800, category: "Pasta", image: "food_23.png" },
    { name: "Chicken Pasta", description: "Pasta with grilled chicken. Balanced protein, carbs and nutrients", price: 3000, category: "Pasta", image: "food_24.png" },
    
    // NOODLES
    { name: "Butter Noodles", description: "Simple butter noodles. Quick energy source with healthy fats", price: 2000, category: "Noodles", image: "food_25.png" },
    { name: "Veg Noodles", description: "Stir-fried noodles with vegetables. Rich in fiber and vitamins", price: 2200, category: "Noodles", image: "food_26.png" },
    { name: "Somen Noodles", description: "Japanese thin wheat noodles. Light, easily digestible carbs", price: 2500, category: "Noodles", image: "food_27.png" },
    { name: "Cooked Noodles", description: "Classic seasoned noodles. Provides quick energy and B vitamins", price: 2300, category: "Noodles", image: "food_28.png" },
    
    // SANDWICH
    { name: "Chicken Sandwich", description: "Grilled chicken sandwich. High in protein, low in fat", price: 2200, category: "Sandwich", image: "food_29.png" },
    { name: "Vegan Sandwich", description: "Vegetable sandwich with hummus. Plant-based protein and fiber", price: 1800, category: "Sandwich", image: "food_30.png" },
    { name: "Grilled Sandwich", description: "Toasted sandwich with cheese. Good source of calcium and protein", price: 2400, category: "Sandwich", image: "food_31.png" },
    { name: "Bread Sandwich", description: "Classic fresh sandwich. Balanced carbs and nutrients", price: 2000, category: "Sandwich", image: "food_32.png" },
    
    // DESSERTS
    { name: "Cup Cake", description: "Delicious cupcake with frosting. Quick energy boost treat", price: 1500, category: "Desserts", image: "food_33.png" },
    { name: "Vegan Cake", description: "Plant-based cake. No dairy, healthier dessert option", price: 2000, category: "Desserts", image: "food_34.png" },
    { name: "Butterscotch Cake", description: "Rich butterscotch layered cake. Sweet indulgent treat", price: 2200, category: "Desserts", image: "food_35.png" },
    { name: "Sliced Cake", description: "Fresh cake with creamy frosting. Perfect celebration dessert", price: 1800, category: "Desserts", image: "food_36.png" }
];

// Upload Function
const uploadFoods = async () => {
    try {
        await connectDB();
        
        console.log("Starting food upload...");
        
        // Clear existing foods
        const deleteResult = await foodModel.deleteMany({});
        console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing foods`);
        
        const foodsWithUrls = [];

        for (const food of vitalMealFoods) {
            const imagePath = path.join(__dirname, 'uploads', food.image);
            console.log(`Uploading ${food.image} to Cloudinary...`);

            const result = await cloudinary.uploader.upload(imagePath, {
                folder: 'vitalmeal'
            });

            foodsWithUrls.push({
                ...food,
                image: result.secure_url
            });

            console.log(`✅ ${food.name} — image uploaded`);
        }

        // Insert all VitaMeal foods
        console.log("Inserting new foods...");
        const insertResult = await foodModel.insertMany(foodsWithUrls);
        console.log(`✅ Successfully uploaded ${insertResult.length} VitaMeal foods!`);
        
        // Verify the count
        const count = await foodModel.countDocuments();
        console.log(` Total foods in database: ${count}`);
        
        // Show first food as sample
        const firstFood = await foodModel.findOne();
        console.log("Sample food:", firstFood?.name);
        
        console.log("Upload complete!");
        process.exit(0);
    } catch (error) {
        console.error(" Error uploading foods:", error.message);
        console.error("Full error:", error);
        process.exit(1);
    }
}


uploadFoods();