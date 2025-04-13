import express from 'express';
import aiController from '../controllers/ai.controller.js';

const router = express.Router();

// Define the /get-response route
router.post('/get-response', aiController.getResponse);

export default router; // Use a default export