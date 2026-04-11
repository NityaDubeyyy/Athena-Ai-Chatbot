

    //   import Chat from "../models/Chat.js";

// Create a new chat
// export const createChat = async (req, res) => {
//     try {
//         const userId = req.user._id;

//         const chatData = {
//             userId,
//             messages: [],
//             name: "New Chat",
//             userName: req.user.name
//         };

//         await Chat.create(chatData);

//         res.json({
//             success: true,
//             message: "Chat Created"
//         });

//     } catch (error) {
//         res.json({
//             success: false,
//             message: error.message
//         });
//     }
// };


// // Get all chats for the logged-in user
// export const getChats = async (req, res) => {
//     try {
//         const userId = req.user._id;

//         const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

//         res.json({
//             success: true,
//             chats
//         });

//     } catch (error) {
//         res.json({
//             success: false,
//             message: error.message
//         });
//     }
// };


// // Delete a chat
// export const deleteChat = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const { chatId } = req.body;

//         if (!chatId) {
//             return res.json({
//                 success: false,
//                 message: "chatId is required"
//             });
//         }

//         const deleted = await Chat.deleteOne({
//             _id: chatId,
//             userId
//         });

//         if (deleted.deletedCount === 0) {
//             return res.json({
//                 success: false,
//                 message: "Chat not found or unauthorized"
//             });
//         }

//         res.json({
//             success: true,
//             message: "Chat deleted successfully"
//         });

//     } catch (error) {
//         res.json({
//             success: false,
//             message: error.message
//         });
//     }
// };


import Chat from "../models/Chat.js";

// -------------------------------
// CREATE NEW CHAT
// -------------------------------
export const createChat = async (req, res) => {
  try {
    const userId = req.user._id;

    const chatData = {
      userId,
      messages: [],
      name: "New Chat",
      userName: req.user.name,
    };

    const newChat = await Chat.create(chatData);

    return res.json({
      success: true,
      message: "Chat created successfully",
      chat: newChat
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// -------------------------------
// GET ALL USER CHATS
// -------------------------------
export const getChats = async (req, res) => {
  try {
    const userId = req.user._id;

    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

    return res.json({
      success: true,
      chats,
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// -------------------------------
// DELETE CHAT
// -------------------------------
export const deleteChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId } = req.body;

    if (!chatId) {
      return res.json({
        success: false,
        message: "chatId is required",
      });
    }

    const deleted = await Chat.deleteOne({ _id: chatId, userId });

    if (deleted.deletedCount === 0) {
      return res.json({
        success: false,
        message: "Chat not found or unauthorized",
      });
    }

    return res.json({
      success: true,
      message: "Chat deleted successfully",
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

