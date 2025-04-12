import { generateResponse } from '../services/ai.service.js';

const getResponse = async (req, res) => {
    const prompt = req.query.prompt;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).send("Prompt is required");
    } 

    try {
        console.log("Calling generateResponse with prompt:", prompt);
        const response = await generateResponse(prompt);
        console.log("Received response from generateResponse:", response);
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: "Error generating response" });
    }
};

export default { getResponse};