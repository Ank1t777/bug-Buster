import express from 'express';

const router = express.Router();

router.post('/get-reviewed', async (req, res) => {
    const { prompt } = req.body;

    // Simulate language detection (replace with actual logic if available)
    const detectedLanguage = 'javascript'; // Example: dynamically detect the language

    // Simulate AI response (replace with actual AI logic)
    res.json({
        message: `
# Here's a review of your code:

## 🔍 [BUG]
- **Issue:** Your code has a potential bug. Here's the fix:
\`\`\`${detectedLanguage}
function sum(a, b) {
    return a + b;
}
\`\`\`

---

## 💡 [STYLE]
- **Improvement:** Consider using more descriptive variable names for better readability.

---

## 💡 [SUGGESTION]
- **Suggestion:** Add error handling to make your code more robust.
`,
    });
});

export default router;