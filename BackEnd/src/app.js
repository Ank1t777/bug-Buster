import express from 'express';
import aiRoutes from './routes/ai.routes.js'; // Adjust the path as necessary

const app = express();

// Add your middleware, routes, etc.
app.use(express.json()); // Middleware to parse JSON bodies

//register the ai routes
app.use('/ai', aiRoutes);
// Example:
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

export default app; // Ensure this line exists