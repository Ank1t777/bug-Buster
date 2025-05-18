import express from 'express';
import dotenv from 'dotenv';
import aiRoutes from './routes/ai.routes.js'; // Adjust the path as necessary
import cors from 'cors'; // Import CORS middleware
dotenv.config();

const app = express();

//configuring CORS to allow cross-origin requests only from vercel
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            'https://bug-buster-sigma.vercel.app',
            'http://localhost:5173',
            'https://bug-buster-rgci74efv-ankit-singhs-projects-2592e8b5.vercel.app'
        ];

        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Block the request
        }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); // Use CORS middleware to allow cross-origin requests

// Add your middleware, routes, etc.
app.use(express.json()); // Middleware to parse JSON bodies

//register the ai routes
app.use('/ai', aiRoutes);


export default app; 