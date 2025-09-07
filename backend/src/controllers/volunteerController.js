import Volunteer from './../models/Volunteer.js';
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js';
import Task from './../models/Task.js';

// API for register a volunteer

const registerVol = async(req, res)=>{
    try{

        const {volunteername, email, password, city, mobile, proof} = req.body

        if(!volunteername|| !email || !password || !city || !mobile || !proof)
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
        if (!uploadImage || !uploadImage.secure_url) {
            return res.status(400).json({ success: false, message: "Image upload failed" });
        }
        const imageUrl = uploadImage.secure_url;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const volunteerData = {
            volunteername,
            mobile,
            email,
            password: hashedPassword,
            city,
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
                city: volunteer.city,
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
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: "7d" });
            res.status(201).json({
                success: true, 
                token,
                volunteer:{
                    id: user._id,
                    volunteername: user.volunteername,
                    email: user.email,
                    mobile: user.mobile,
                    city: user.city
                    }
                })
        }
    } catch(error){
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}


// Get all tasks

const getAllTasks = async(req,res) =>{

    try{
        const {volId} = req.params;
        if(!volId)
            return res.status(400).json({success: false, message: "Volunteer Id required"});

        const volunteer = await Volunteer.findById(volId);
        if(!volunteer)
            return res.status(404).json({success: false, message: "Volunteer not found"})

        const tasks = await Task.find({assignedTo: volId}).populate("reportedBy", "username email mobile city address").sort({createdAt: -1});

        const totalTasks = tasks.length;
        const activeTasks = tasks.filter(t => t.status === "Assigned" || t.status === "In Progress").length;
        const completedTasks = tasks.filter(t => t.status === "Completed").length;
        const criticalTasks = tasks.filter(t => t.category === "Critical").length;

        res.status(200).json({success: true, total: totalTasks, active: activeTasks, completed: completedTasks, critical: criticalTasks, tasks})

    } catch(error){
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

// update the task status

const updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body; 

        if (!taskId || !status) {
            return res.status(400).json({ success: false, message: "Task ID and status are required" });
        }

        if (!["Assigned", "In Progress", "Completed"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        task.status = status;
        await task.save();

        res.status(200).json({ success: true, message: `Task status updated to ${status}`, task });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export {registerVol, loginVol, getAllTasks, updateTaskStatus};
