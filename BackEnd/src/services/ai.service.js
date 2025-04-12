import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

console.log(ai.models);

export async function generateResponse(prompt) {
    try {
        const response = await ai.models.generateContent(
            {
                model: "gemini-2.0-flash",
                contents: prompt
            });
        return response.text.replace(/\n/g, ''); // Remove HTML tags
    } catch (error) { 
        console.error("Error in generateResponse:", error);
        throw error;
    }
}
