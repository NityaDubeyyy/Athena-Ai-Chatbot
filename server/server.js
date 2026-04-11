
// import dotenv from 'dotenv';
// dotenv.config();

// import express from 'express';
// import cors from 'cors';
// import http from 'http';
// import connectDB from './configs/db.js';
// import userRoutes from './routes/userRoutes.js';
// import chatRoutes from './routes/chatRoutes.js';
// import messageRouter from './routes/messageRoutes.js';
// import creditRouter from './routes/creditRoutes.js';
// import { stripeWebhooks } from './controllers/webhooks.js';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import fs from 'fs';

// const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // MIDDLEWARE - CORS must be first
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Handle preflight requests
// // app.options('(.*)', cors()); // cors() middleware already handles this

// // Special handling for Stripe webhooks (must be BEFORE express.json)
// app.post('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// // Global JSON parser for all other routes
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Middleware to ensure database connection
// const ensureDBConnection = async (req, res, next) => {
//     try {
//         await connectDB();
//         next();
//     } catch (error) {
//         console.error('Database connection failed:', error.message);
//         res.status(500).json({ success: false, message: 'Internal server error: Database connection failed' });
//     }
// };

// // Use database connection middleware for all API routes (EXCEPT stripe webhooks)
// app.use('/api', (req, res, next) => {
//     if (req.path === '/stripe') return next();
//     return ensureDBConnection(req, res, next);
// });

// // Routes
// app.get('/api/health', (req, res) => {
//     res.json({ status: 'Server is running', time: new Date().toISOString() });
// });

// app.get('/', (req, res) => {
//     res.send('Athena AI API is running');
// });

// app.use('/api/user', userRoutes);
// app.use('/api/chat', chatRoutes);
// app.use('/api/message', messageRouter);
// app.use('/api/credit', creditRouter);

// // SERVE CLIENT SIDE FILES
// const distPath = path.join(__dirname, '../client/dist');

// // Check if dist exists, if not create a fallback
// if (fs.existsSync(distPath)) {
//     app.use(express.static(distPath, { 
//         maxAge: '1d',
//         etag: false 
//     }));
// }

// // SPA routing - serve index.html for non-API routes
// app.get(/^((?!\/api).)*$/, (req, res) => {
//     const distPath = path.join(__dirname, '../client/dist');
//     const indexPath = path.join(distPath, 'index.html');

//     if (fs.existsSync(indexPath)) {
//         res.sendFile(indexPath, (err) => {
//             if (err) {
//                 res.status(200).send('Athena AI API is active');
//             }
//         });
//     } else {
//         res.status(200).send('Athena AI API is active. Client not built.');
//     }
// });

// const PORT = process.env.PORT || 4000;

// // Export app for Vercel
// export default app;

// // Only listen if not running as a Vercel function
// if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
//     const server = http.createServer(app);
//     server.listen(PORT, () => {
//         console.log(`
//         ==================================================
//         🚀 SERVER STARTED SUCCESSFULLY 🚀
//         Current Time: ${new Date().toLocaleTimeString()}
//         ==================================================
//         `);
//         console.log(`Server running at: http://localhost:${PORT}`);
//     });
// }

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import http from 'http';
import connectDB from './configs/db.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import creditRouter from './routes/creditRoutes.js';
import { stripeWebhooks } from './controllers/webhooks.js';

// --- VERCEL DIAGNOSTICS ---
process.on('uncaughtException', (err) => {
    console.error('CRITICAL: Uncaught Exception:', err.message);
    console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('CRITICAL: Unhandled Rejection at:', promise, 'reason:', reason);
});

if (!process.env.MONGODB_URI) {
    console.error('FATAL ERROR: MONGODB_URI is not defined in Environment Variables.');
}
// --------------------------

console.log('INITIALIZING SERVER...');
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || true, // Reflects the request origin for credentials Support
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request Logger (Helpful for Vercel debugging)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.options(/.*/, cors());

// Special handling for Stripe webhooks (must be BEFORE express.json)
app.post('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

app.use(express.json());

// Middleware to ensure database connection
const ensureDBConnection = async (req, res, next) => {
    try {
        console.log(`[${new Date().toISOString()}] Connecting to MongoDB for ${req.path}...`);
        await connectDB();
        next();
    } catch (error) {
        console.error('DATABASE CONNECTION ERROR:', error.message);
        res.status(500).json({
            success: false,
            message: 'Database connection failed. Check Vercel Environment Variables.',
            error: process.env.NODE_ENV === 'production' ? null : error.message
        });
    }
};

app.use('/api', (req, res, next) => {
    if (req.path === '/stripe') return next();
    return ensureDBConnection(req, res, next);
});

// Health Checks
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', time: new Date().toISOString() });
});

app.get('/', (req, res) => {
    res.status(200).send('API is running...');
});

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRouter)
app.use('/api/credit', creditRouter)

app.all(/\/api\/.*/, (req, res) => {
    res.status(404).json({ success: false, message: 'API endpoint not found' });
});

app.use((req, res) => {
    res.status(200).send('API is running...');
});

// Export for Vercel
export default app;

// Only listen locally
const isVercel = process.env.VERCEL === '1' || !!process.env.VERCEL || process.env.NODE_ENV === 'production';
console.log('Vercel environment detected:', isVercel);

if (!isVercel) {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running at: http://localhost:${PORT}`);
    });
}