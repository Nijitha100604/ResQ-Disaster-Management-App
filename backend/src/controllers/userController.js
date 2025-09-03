import User from './../models/User.js';
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from 'jsonwebtoken';

// API to register a user

const registerUser = async(req,res) =>{
    try{
        const {username, email, mobile, city, address, password} = req.body;

        if(!username || !email || !mobile || !city || !address || !password)
            return res.status(400).json({success: false, message: "Please enter all details"});

        if(!validator.isEmail(email))
            return res.status(400).json({success: false, message: "Invalid email"});

        const existingUser = await User.findOne({email})
        if(existingUser)
            return res.status(400).json({success: false, message: "Email already exists"});

        const existingMobile = await User.findOne({mobile})
        if(existingMobile)
            return res.status(400).json({success: false, message: "Mobile already exists"});

        if(password.length < 6)
            return res.status(400).json({success: false, message: "Passowrd length should be greater than 6!"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            username,
            email,
            mobile,
            password: hashedPassword,
            city,
            address
        }

        const newUser = new User(userData);
        const user = await newUser.save()

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);

        res.status(201).json({
            success: true, 
            token,
            user:{
                id: user._id,
                username: user.username,
                email: user.email,
                mobile: user.mobile,
                city: user.city,
                address: user.address
            },
            message: "User created"});

    } catch(error){
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
}

// API to login a user

const loginUser = async(req, res) =>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user)
            return res.status(400).json({success: false, message: "Invalid email"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).json({success: false, message: "Incorrect password"});
        else{
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            res.status(201).json({
                success: true, 
                token,
                user:{
                id: user._id,
                username: user.username,
                email: user.email,
                mobile: user.mobile,
                city: user.city,
                address: user.address
                }
            })
        }
    } catch(error){
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
}



export default {registerUser, loginUser};