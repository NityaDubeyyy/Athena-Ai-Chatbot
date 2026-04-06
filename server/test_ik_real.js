import dotenv from "dotenv";
dotenv.config();
import axios from 'axios';
import ImageKit from 'imagekit';

const imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});
async function go() {
    try {
        const aiImageResponse = await axios.get('https://image.pollinations.ai/prompt/cat', { responseType: 'arraybuffer' });
        const b64 = 'data:image/png;base64,' + Buffer.from(aiImageResponse.data, 'binary').toString('base64');
        const up = await imageKit.upload({ file: b64, fileName: 'cat.png' });
        console.log('UPLOAD SUCCESS:', up.url);
    } catch(e) {
        console.log('UPLOAD FAILED', e);
    }
}
go();
