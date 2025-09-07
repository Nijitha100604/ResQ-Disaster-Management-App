import User from './../models/User.js';
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from 'jsonwebtoken';
import cloudinary from './../config/cloudinary.js';
import Incident from '../models/Incident.js';
import Volunteer from '../models/Volunteer.js';
import Task from './../models/Task.js';

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

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, { expiresIn: "7d" });

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

        if(!email || !password)
            return res.status(400).json({success: false, message: "Email and password are required"});

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

// API to create an incident

const createIncident = async(req, res) =>{
    try{
        const {severity, description, contact, image, latitude, longitude, reportedBy, fullAddress} = req.body;
        if(!reportedBy)
            return res.status(400).json({success: false, message: "Invalid user"});
        if(!severity || !description || !contact || !image || latitude === undefined || longitude === undefined || !fullAddress)
            return res.status(400).json({success: false, message: "Please provide all details"})

        const user = await User.findById(reportedBy);
        if(!user)
            return res.status(400).json({success: false, message: "User not found"})

        const uploadResponse = await cloudinary.uploader.upload(image);
        if (!uploadResponse || !uploadResponse.secure_url) {
            return res.status(400).json({ success: false, message: "Image upload failed" });
        }
        const imageUrl = uploadResponse.secure_url;

        const incident = new Incident({
            severity,
            description,
            contact,
            reportedBy,
            evidence: imageUrl,
            location:{
                type: "Point",
                coordinates: [longitude, latitude],
                fullAddress
            }
        })
        await incident.save();

        const volunteer = await Volunteer.findOne({city: user.city});
        if(volunteer){
            const task = new Task({
                category: severity,
                description,
                reportedBy: user._id,
                assignedTo: volunteer._id,
                location:{
                    type:"Point",
                    coordinates: [longitude, latitude],
                    fullAddress
                },
                contact: user.mobile,
                evidence: imageUrl
            })
            await task.save();
        }

        res.status(201).json({success: true, message: "Incident created", incident})

    } catch(error){
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
}

// get all incidents

const getUserIncidents = async(req,res)=>{
    try{
        const {userId} = req.params;
        if(!userId)
            return res.status(400).json({success: false, message: "User not found"});
        const incidents = await Incident.find({reportedBy: userId}).sort({createdAt: -1});
        res.status(200).json({success: true, count: incidents.length, incidents})
    } catch(error){
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
}

// create sos incident

const sosIncident = async(req, res) =>{
    try{
        const { latitude, longitude, fullAddress, reportedBy } = req.body;

        if (latitude === undefined || longitude === undefined || !fullAddress) {
            return res.status(400).json({ success: false, message: "Location details required" });
        }

        if (!reportedBy) {
            return res.status(400).json({ success: false, message: "User ID required" });
        }

        const user = await User.findById(reportedBy);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const incident = new Incident({
            severity: "Critical",
            description: "SOS Emergency triggered",
            contact: user.mobile,
            reportedBy,
            evidence: "",
            location:{
                type: "Point",
                coordinates: [longitude, latitude],
                fullAddress
            }
        })
        await incident.save();

        const volunteer = await Volunteer.findOne({ city: user.city });
        if (volunteer) {
            const task = new Task({
                category: "Critical",
                description: "SOS Emergency triggered",
                reportedBy: user._id,
                assignedTo: volunteer._id,
                location: {
                    type: "Point",
                    coordinates: [longitude, latitude],
                    fullAddress
                },
                contact: user.mobile
            });
            await task.save();
        }

        res.status(201).json({success: true, message: "Incident created", incident})

    } catch(error){
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
}

export {registerUser, loginUser, createIncident, getUserIncidents, sosIncident};