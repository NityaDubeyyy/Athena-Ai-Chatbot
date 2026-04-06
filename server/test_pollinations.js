async function testPollinations() {
    console.log("Testing Pollinations.ai URL variations...");
    const prompt = "cat";

    const urls = [
        `https://image.pollinations.ai/prompt/${prompt}`,
        `https://pollinations.ai/p/${prompt}`,
    ];

    for (const url of urls) {
        console.log(`Trying: ${url}`);
        try {
            const response = await fetch(url);
            console.log(`Status: ${response.status}`);
            if (response.ok) {
                console.log("Success!");
               
            }
        } catch (e) {
            console.error("Error:", e.message);
        }
    }
}

testPollinations();
