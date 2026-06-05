import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


// login user 
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false,message:"user does not exist"})
        }
        
        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) {
            return res.json({success:false,message:"Incorrect password"});
        }

        const token = createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log("LOGIN ERROR:", error.message, error.stack);
        res.json({success:false,message:error.message})
}
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user 
const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try {
        // checking if user already exists
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false,message:"User already exists"})
        }

        // validating email format and if password is strong
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if (password.length<8) {
            return res.json({success:false,message:"please enter a strong password"})
        }

        // hashing user password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        return res.json({success:true,token})

    } catch (error) {
        console.log("REGISTER ERROR:", error.message, error.stack);
        return res.json({success:false,message:error.message})
}
}

export {loginUser,registerUser}