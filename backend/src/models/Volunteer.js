import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
    volunteername:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    mobile:{
        type: String,
        required: true,
        unique: true
    },
    proof:{
        type: String,
        default: "",
        required: true
    },
    location:{
        type: String,
        required: true
    }
}, {timestamps: true})

const Volunteer = mongoose.model("Volunteer", volunteerSchema);
export default Volunteer;