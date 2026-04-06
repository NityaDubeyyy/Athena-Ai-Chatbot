import axios from 'axios';
import dns from 'dns';
import dotenv from 'dotenv';
dotenv.config();

async function diagnoseNetworkIssues() {
  console.log('=== Network Diagnostics ===\n');
  
  // Test DNS resolution
  console.log('1. Testing DNS resolution for image.pollinations.ai...');
  try {
    const addresses = await new Promise((resolve, reject) => {
      dns.resolve4('image.pollinations.ai', (err, addresses) => {
        if (err) reject(err);
        else resolve(addresses);
      });
    });
    console.log('✅ DNS Resolution successful:', addresses);
  } catch (error) {
    console.log('❌ DNS Resolution failed:', error.message);
    return;
  }
  
  // Test HTTP connection
  console.log('\n2. Testing HTTP connection to Pollinations.ai...');
  try {
    const response = await axios.get('https://image.pollinations.ai/prompt/test', {
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    console.log('✅ HTTP Connection successful - Status:', response.status);
  } catch (error) {
    console.log('❌ HTTP Connection failed:', error.message);
    if (error.code) {
      console.log('   Error Code:', error.code);
    }
  }
  
  // Test actual image generation
  console.log('\n3. Testing actual image generation...');
  try {
    const testUrl = 'https://image.pollinations.ai/prompt/cat?width=100&height=100';
    const response = await axios.get(testUrl, {
      timeout: 10000,
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    console.log('✅ Image generation successful - Size:', response.data.length, 'bytes');
  } catch (error) {
    console.log('❌ Image generation failed:', error.message);
    if (error.code) {
      console.log('   Error Code:', error.code);
    }
  }
  
  console.log('\n=== Diagnostics Complete ===');
}

diagnoseNetworkIssues();
