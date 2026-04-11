
import express from 'express';
import { protect } from '../middlewares/auth.js';
import {
    textMessageController,
    uploadImageMessageController,
    imageMessageController
} from '../controllers/messageController.js';

const messageRouter = express.Router();

// Route for AI Text Chat (called as /api/message/text)
messageRouter.post('/text', protect, textMessageController);

// Route for Uploading an Image
messageRouter.post('/upload', protect, uploadImageMessageController);

// Route for Generating an AI Image from a Prompt (called as /api/message/image)
messageRouter.post('/image', protect, imageMessageController);

export default messageRouter;