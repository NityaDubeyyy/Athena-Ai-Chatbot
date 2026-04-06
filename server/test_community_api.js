import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

async function testCommunityAPI() {
  try {
    console.log('Testing community images API endpoint...');
    
    const response = await axios.get('http://localhost:5000/api/user/published-images');
    
    console.log('API Response Status:', response.status);
    console.log('Success:', response.data.success);
    console.log('Images Count:', response.data.images?.length || 0);
    
    if (response.data.images && response.data.images.length > 0) {
      console.log('Sample images:');
      response.data.images.slice(0, 3).forEach((img, index) => {
        console.log(`${index + 1}. User: ${img.userName}, URL: ${img.imageUrl}`);
      });
    }
    
  } catch (error) {
    console.error('API Test Failed:', error.message);
    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    }
  }
}

testCommunityAPI();
