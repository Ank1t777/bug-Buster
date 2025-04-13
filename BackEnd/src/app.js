import express from 'express';
import dotenv from 'dotenv';
import aiRoutes from './routes/ai.routes.js'; // Adjust the path as necessary
import cors from 'cors'; // Import CORS middleware
dotenv.config();

const app = express();

app.use(cors()); // Use CORS middleware to allow cross-origin requests

// Add your middleware, routes, etc.
app.use(express.json()); // Middleware to parse JSON bodies

//register the ai routes
app.use('/ai', aiRoutes);


export default app; // Ensure this line exists