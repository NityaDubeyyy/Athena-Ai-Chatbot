import dotenv from "dotenv";
dotenv.config();
import { OpenAI } from "openai";

console.log("Testing Gemini 2.5 Flash via OpenAI SDK...");

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

async function main() {
    try {
        const response = await openai.chat.completions.create({
            model: "gemini-2.5-flash",
            messages: [{ role: "user", content: "Hello, are you working?" }],
        });
        console.log("Success:", response.choices[0].message.content);
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
