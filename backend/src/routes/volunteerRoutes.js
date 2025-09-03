import express from 'express';
import { loginVol, registerVol } from '../controllers/volunteerController.js';

const volRouter = express.Router();

volRouter.post('/register', registerVol);
volRouter.post('/login', loginVol);

export default volRouter;
