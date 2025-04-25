import express from 'express';

const router = express.Router();

router.post('/get-reviewed', async (req, res) => {
    const { prompt } = req.body;

    // Simulate AI response (replace this with your actual AI logic)
    const suggestion = `
**Here's an improved version of your code:**

\`\`\`javascript
/**
 * Sums two numbers.
 * @param {number} a The first number.
 * @param {number} b The second number.
 * @returns {number} The sum of a and b.
 */
function sum(a, b) {
    return a + b;
}
\`\`\`

Now your function is more reusable and includes proper documentation! 😊`;

    res.json({
        message: "Here's a suggestion to improve your code:",
        suggestion: suggestion,
    });
});

export default router;