import mongoose from 'mongoose';
import Chat from './models/Chat.js';
import dotenv from 'dotenv';
dotenv.config();

async function debugImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/athena-chatbot');
    console.log('Connected to MongoDB');
    
    const publishedImages = await Chat.aggregate([
      {$unwind:'$messages'},
      {$match: {'messages.isImage': true, 'messages.isPublished': true}},
      {$project: {_id: 0, imageUrl: '$messages.content', userName: '$userName'}}
    ]);
    
    console.log('Published images count:', publishedImages.length);
    console.log('Sample published images:', publishedImages.slice(0, 3));
    
    const allImages = await Chat.aggregate([
      {$unwind:'$messages'},
      {$match: {'messages.isImage': true}},
      {$project: {_id: 0, imageUrl: '$messages.content', userName: '$userName', isPublished: '$messages.isPublished'}}
    ]);
    
    console.log('All images count:', allImages.length);
    console.log('Sample all images:', allImages.slice(0, 3));
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

debugImages();
