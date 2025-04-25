import express from 'express';
import aiController from '../controllers/ai.controller.js';

const router = express.Router();

// Define the /get-reviewed route
router.post('/get-reviewed', aiController.getReviewed);

export default router; // Use a default export