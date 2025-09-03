import express from "express"
import "dotenv/config"
import cors from "cors"
import {connectDB} from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})