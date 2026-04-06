// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//     try {
//         let token = req.headers.authorization;
//         if (!token) {
//             return res.status(401).json({ success: false, message: 'Not authorized, no token' });
//         }

//         // Accept both raw token and "Bearer <token>" header formats
//         if (typeof token === 'string' && token.startsWith('Bearer ')) {
//             token = token.split(' ')[1];
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const userId = decoded.id;

//         // Use await and .lean() to get a plain JS object (avoids circular refs)
//         const user = await User.findById(userId).select('-password').lean();

//         if (!user) {
//             return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
//         }

//         req.user = user; // plain object safe to JSON.stringify
//         next();
//     } catch (error) {
//         return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
//     }
// };

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authorized, no token' });
        }

        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1].trim();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); 

        req.user = await User.findById(decoded.id).select("-password").lean();

        next();
    } catch (error) {
        console.log("JWT VERIFY ERROR:", error.message);
        return res.status(401).json({
            success: false,
            message: "Not authorized, token failed"
        });
    }
};


    