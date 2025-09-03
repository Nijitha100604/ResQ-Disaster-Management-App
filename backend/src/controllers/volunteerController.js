import Volunteer from './../models/Volunteer.js';
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js';

// API for register a volunteer

const registerVol = async(req, res)=>{
    try{

        const {volunteername, email, password, location, mobile, proof} = req.body

        if(!volunteername|| !email || !password || !location || !mobile || !proof)
            return res.status(400).json({success: false, message: "Please fill all details"})

        if(!validator.isEmail(email))
            return res.status(400).json({success: false, message: "Invalid email"});

        const existingVolunteer = await Volunteer.findOne({email})
        if(existingVolunteer)
            return res.status(400).json({success: false, message: "Volunteer already exists"})

        const existingMobile = await Volunteer.findOne({mobile})
        if(existingMobile)
            return res.status(400).json({success: false, message: "Mobile already exists"})

        if(password.length < 6)
            return res.status(400).json({success: false, message: "Password should be greater than 6!"});

        const uploadImage = await cloudinary.uploader.upload(proof);
        const imageUrl = uploadImage.secure_url;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const volunteerData = {
            volunteername,
            mobile,
            email,
            password: hashedPassword,
            location,
            proof: imageUrl
        }

        const newVolunteer = new Volunteer(volunteerData);
        const volunteer = await newVolunteer.save();

        const token = jwt.sign({id:volunteer._id}, process.env.JWT_SECRET);
        res.status(201).json({
            success: true,
            token,
            volunteer:{
                id: volunteer._id,
                volunteername: volunteer.volunteername,
                email: volunteer.email,
                mobile: volunteer.mobile,
                location: volunteer.location,
                proof: volunteer.proof
            },
            message: "Volunteer created"
        })


    } catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: error.message})
    }
};


// Login a volunteer

const loginVol = async(req,res) =>{
    try{
        const {email, password} = req.body;
        const user = await Volunteer.findOne({email});

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
                volunteer:{
                    id: user._id,
                    volunteername: user.username,
                    email: user.email,
                    mobile: user.mobile,
                    location: user.location
                    }
                })
        }
    } catch(error){
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}


export {registerVol, loginVol};
