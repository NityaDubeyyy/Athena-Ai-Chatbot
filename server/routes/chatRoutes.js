
// import express from "express";
// import { createChat, deleteChat, getChats } from "../controllers/chatController.js";
// import { protect } from "../middlewares/auth.js";

// const chatRouter = express.Router();

// chatRouter.post('/create', protect, createChat);
// chatRouter.get('/get', protect, getChats);
// chatRouter.delete('/delete', protect, deleteChat);

// chatRouter.get('/test', (req, res) => {
//     res.send("Chat routes working");
// });


// export default chatRouter;

import express from "express";
import { createChat, deleteChat, getChats } from "../controllers/chatController.js";
import { protect } from "../middlewares/auth.js";

const chatRouter = express.Router();

chatRouter.get('/ping', (req, res) => {
    res.send("Ping OK");
});

chatRouter.get('/create', protect, createChat);
chatRouter.get('/get', protect, getChats);
chatRouter.post('/delete', protect, deleteChat);

export default chatRouter;


