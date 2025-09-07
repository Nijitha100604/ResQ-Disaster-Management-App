import express from "express"
import {registerUser, loginUser, createIncident, getUserIncidents, sosIncident} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser); 
userRouter.post("/incident", createIncident);
userRouter.get("/incidents/:userId", getUserIncidents);
userRouter.post("/sos-incident", sosIncident);

export default userRouter;
