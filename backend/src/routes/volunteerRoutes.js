import express from 'express';
import { getAllTasks, loginVol, registerVol, updateTaskStatus } from '../controllers/volunteerController.js';

const volRouter = express.Router();

volRouter.post('/register', registerVol);
volRouter.post('/login', loginVol);
volRouter.get('/tasks/:volId', getAllTasks);
volRouter.put('/tasks/:taskId/status', updateTaskStatus);

export default volRouter;
