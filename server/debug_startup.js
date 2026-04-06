import express from 'express';
import dotenv from 'dotenv';

console.log("1. Loaded simple imports");

try {
    dotenv.config();
    console.log("2. Dotenv configured. PORT:", process.env.PORT);
} catch (e) {
    console.error("2. Dotenv failed:", e);
}

// Try importing detailed modules
(async () => {
    try {
        console.log("3. Importing connectDB...");
        const connectDB = (await import('./configs/db.js')).default;
        console.log("3b. connectDB imported.");

        console.log("4. Connecting to DB...");
        await connectDB();
        console.log("4b. DB Connected.");

        console.log("5. Importing routes...");
        await import('./routes/messageRoutes.js');
        console.log("5b. Routes imported.");

        console.log("SUCCESS: Startup checks passed.");
    } catch (e) {
        console.error("CRITICAL FAILURE DURING STARTUP:", e);
    }
})();
