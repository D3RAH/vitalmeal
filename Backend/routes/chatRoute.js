import express from 'express';
import { chatWithBot } from '../controllers/chatController.js';
import authMiddleware from '../middleware/auth.js';


const chatRouter = express.Router();


chatRouter.post("/message", authMiddleware, chatWithBot);

export default chatRouter;