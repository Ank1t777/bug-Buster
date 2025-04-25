import express from 'express';

const router = express.Router();

router.post('/get-reviewed', async (req, res) => {
    const { prompt } = req.body;

    // Simulate AI response (replace this with your actual AI logic)
    const suggestion = `The function \`sum\` is a good start, but let's make it more flexible. Right now, it only adds \`1 + 1\`. What if we wanted to add other numbers? Here's how you can modify it to accept arguments, making it more reusable:
    
\`\`\`javascript
function sum(a, b) {
    return a + b;
}
\`\`\`

Now you can call it like \`sum(5, 3)\` or \`sum(10, 20)\`. Much more useful, right? 😉`;

    // Return a conversational response
    res.json({
        message: "Here's a suggestion to improve your code:",
        suggestion: suggestion,
    });
});

export default router;