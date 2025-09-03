import mongoose from "mongoose"

const incidentSchema = new mongoose.Schema({
    severity:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    },
    evidence:{
        type: String,
        default: "",
        required: true
    },
    reportedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    location:{
        type:{
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates:{
            type:[Number],
            required: true
        },
        fullAddress:{
            type: String,
            required: true
        }
    }
}, {timestamps: true});

incidentSchema.index({ location: "2dsphere" });

const Incident = mongoose.model("Incident", incidentSchema);
export default Incident;