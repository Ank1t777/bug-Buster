import express from 'express';
import { getReviewed } from '../controllers/ai.controller.js';

const router = express.Router();

router.post('/get-reviewed', async (req, res) => {
    const { prompt } = req.body;

    try {
        // const aiResponse = await generateResponse(prompt);
        const aiResponse = await getReviewed(prompt);
        res.json({
            response: aiResponse,
        });
    } catch (error) {
        console.log("❌ Error in /get-reviewed route:", error);
        res.status(500).json({
            error: 'An error occurued while processing your request.',
        });
    }
});

export default router;

    // Simulate language detection (replace with actual logic if available)
//     const detectedLanguage = 'javascript'; // Example: dynamically detect the language

//     // Simulate AI response (replace with actual AI logic)
//     res.json({
//         message: `
// # Here's a review of your code:

// ## 🔍 [BUG]
// - **Issue:** Your code has a potential bug. Here's the fix:
// \`\`\`${detectedLanguage}
// function sum(a, b) {
//     return a + b;
// }
// \`\`\`

// ---

// ## 💡 [STYLE]
// - **Improvement:** Consider using more descriptive variable names for better readability.

// ---

// ## 💡 [SUGGESTION]
// - **Suggestion:** Add error handling to make your code more robust.
// `,
//     });
// });
