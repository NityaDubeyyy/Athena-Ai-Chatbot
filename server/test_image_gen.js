import dotenv from "dotenv";
dotenv.config();


async function testPollinations() {
    console.log("Testing Pollinations.ai...");
    const prompt = "A futuristic city with neon lights";
    const encodedPrompt = encodeURIComponent(prompt);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}`;

    try {
        const response = await fetch(url);
        console.log("Status:", response.status);
        console.log("Content-Type:", response.headers.get("content-type"));
        if (response.ok) {
            console.log("Success! Pollinations.ai returned an image.");
        } else {
            console.error("Pollinations.ai failed.");
        }
    } catch (e) {
        console.error("Error:", e);
    }
}


async function testImageKitPattern() {
    console.log("Testing Suspicious ImageKit URL Pattern...");
    const prompt = "test";
    const encodedPrompt = encodeURIComponent(prompt);
    const endpoint = process.env.IMAGEKIT_URL_ENDPOINT;
    if (!endpoint) {
        console.log("Skipping ImageKit test (no endpoint)");
        return;
    }


    const url = `${endpoint}/ik-genimg-prompt-${encodedPrompt}/${Date.now()}.png?tr=w-800,h-800`;
    console.log("URL:", url);

    try {
        const response = await fetch(url);
        console.log("Status:", response.status);
        if (response.status === 404) {
            console.log("Confirmed: This URL pattern is invalid (404).");
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

async function main() {
    await testImageKitPattern();
    await testPollinations();
}

main();
