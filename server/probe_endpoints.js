
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const testEndpoint = async (url) => {
    console.log(`Testing POST: ${url}`);
    try {
        const response = await axios.post(url, {
            model: "models/gemini-2.0-flash",
            messages: [{ role: "user", content: "hi" }]
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`
            }
        });
        console.log(`SUCCESS for ${url}:`, response.data.choices[0].message.content);
        return true;
    } catch (error) {
        console.log(`FAILED for ${url}: ${error.response?.status} ${error.message}`);
        return false;
    }
};

const main = async () => {
    const urls = [
        "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
        "https://generativelanguage.googleapis.com/v1beta/openai/v1/chat/completions",
        "https://generativelanguage.googleapis.com/v1beta/chat/completions"
    ];
    for (const url of urls) {
        if (await testEndpoint(url)) break;
    }
};

main();
