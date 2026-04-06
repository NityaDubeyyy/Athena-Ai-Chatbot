import dotenv from "dotenv";
dotenv.config();

console.log("--- Debugging ImageKit ---");
console.log("CWD:", process.cwd());
console.log("PUBLIC_KEY present:", !!process.env.IMAGEKIT_PUBLIC_KEY);
console.log("PRIVATE_KEY present:", !!process.env.IMAGEKIT_PRIVATE_KEY);
console.log("URL_ENDPOINT present:", !!process.env.IMAGEKIT_URL_ENDPOINT);


import imageKit from "./configs/imageKit.js";

console.log("ImageKit Object is:", imageKit ? "Initialized" : "NULL");

if (imageKit) {
    console.log("Successfully initialized. Attempting upload test...");

    const base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

    imageKit.upload({
        file: base64Image,
        fileName: "test_pixel.png",
        folder: "debug_test"
    }).then(response => {
        console.log("✅ Upload Successful!");
        console.log("File URL:", response.url);
        console.log("File ID:", response.fileId);
    }).catch(error => {
        console.error("❌ Upload Failed!");
        console.error("Error Message:", error.message);
        console.error("Full Error:", error);
    });

} else {
    console.error("FAILED: ImageKit is null despite env check attempt.");
}
