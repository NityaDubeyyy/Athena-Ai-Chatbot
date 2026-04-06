
import dotenv from "dotenv";
dotenv.config();
import { OpenAI } from "openai";

const testBaseUrl = async (url) => {
    console.log(`Testing: ${url}`);
    const client = new OpenAI({
        apiKey: process.env.GEMINI_API_KEY,
        baseURL: url
    });
    try {
        const response = await client.models.list();
        console.log(`SUCCESS for ${url}:`, response.data.map(m => m.id).slice(0, 3));
        return true;
    } catch (error) {
        console.log(`FAILED for ${url}: ${error.status} ${error.message}`);
        return false;
    }
};

const main = async () => {
    const urls = [
        "https://generativelanguage.googleapis.com/v1beta/openai/",
        "https://generativelanguage.googleapis.com/v1beta/openai/v1/",
        "https://generativelanguage.googleapis.com/v1beta/",
        "https://generativelanguage.googleapis.com/v1beta/openai/v1"
    ];
    for (const url of urls) {
        if (await testBaseUrl(url)) break;
    }
};

main();
