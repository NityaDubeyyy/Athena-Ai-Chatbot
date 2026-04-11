// import ImageKit from "imagekit";

// var imageKit=new ImageKit({
//     publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//     privatekey: process.env.IMAGEKIT_PRIVATE_KEY,
//     urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
// })
// export default imageKit;
import ImageKit from "@imagekit/nodejs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Attempt to load .env from server root (parent of configs)
dotenv.config({ path: path.join(__dirname, '../.env') });

// Fallback to default
dotenv.config();

console.log("--- ImageKit Initialization ---");
console.log("CWD:", process.cwd());
console.log("Checking ENV keys:",
    "PUBLIC:", !!process.env.IMAGEKIT_PUBLIC_KEY,
    "PRIVATE:", !!process.env.IMAGEKIT_PRIVATE_KEY,
    "ENDPOINT:", !!process.env.IMAGEKIT_URL_ENDPOINT
);

let imageKit = null;

// Initialize ImageKit only if credentials are available
if (process.env.IMAGEKIT_PUBLIC_KEY && process.env.IMAGEKIT_PRIVATE_KEY && process.env.IMAGEKIT_URL_ENDPOINT) {
    imageKit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
    });
    console.log("✓ ImageKit initialized successfully");
} else {
    console.warn("⚠ ImageKit credentials not found in .env - image features will be unavailable");
}

export default imageKit;
