import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    reportedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Volunteer",
        required: true
    },
    location:{
        type:{
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number],
            required: true
        },
        fullAddress:{
            type: String,
            required: true
        }
    },
    contact:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: "Assigned"
    },
    evidence:{
        type: String,
        default: ""
    }
}, {timestamps: true});

taskSchema.index({ location: "2dsphere" });

const Task = mongoose.model("Task", taskSchema);
export default Task;