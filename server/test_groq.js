import dotenv from "dotenv";
dotenv.config();
import { OpenAI } from "openai";

console.log("Testing Groq API...");
console.log("GROQ_API_KEY present:", !!process.env.GROQ_API_KEY);

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

async function main() {
    try {
        console.log("Sending request to Groq with model: llama-3.3-70b-versatile");
        const response = await openai.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: "Hello, are you functional?" }],
        });
        console.log("Success! Response from Groq:");
        console.log(response.choices[0].message.content);
    } catch (error) {
        console.error("Error connecting to Groq:", error);
    }
}

main();
