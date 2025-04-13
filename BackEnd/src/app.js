import express from 'express';
import dotenv from 'dotenv';
import aiRoutes from './routes/ai.routes.js'; // Adjust the path as necessary

dotenv.config();

const app = express();

// Add your middleware, routes, etc.
app.use(express.json()); // Middleware to parse JSON bodies

//register the ai routes
app.use('/ai', aiRoutes);


export default app; // Ensure this line exists