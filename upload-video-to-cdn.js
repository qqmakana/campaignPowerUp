#!/usr/bin/env node

/**
 * Upload V8.mp4 to BunnyCDN
 * This script helps upload your large video file to BunnyCDN
 * 
 * Steps:
 * 1. Sign up at https://bunny.net (free tier available)
 * 2. Create a Storage Zone
 * 3. Get your API key and Storage Zone name
 * 4. Run this script
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration - Replace with your BunnyCDN details
const BUNNY_CONFIG = {
  apiKey: 'YOUR_BUNNY_API_KEY', // Get from BunnyCDN dashboard
  storageZone: 'YOUR_STORAGE_ZONE_NAME', // Get from BunnyCDN dashboard
  region: 'ny', // or 'la', 'sg', 'syd', 'sao', 'lon', 'fra', 'waw'
  videoPath: '/videos/V8.mp4' // Path in your storage zone
};

const VIDEO_FILE = path.join(__dirname, 'public', 'assets', 'V8.mp4');

async function uploadToBunnyCDN() {
  console.log('🚀 Starting video upload to BunnyCDN...');
  
  // Check if video file exists
  if (!fs.existsSync(VIDEO_FILE)) {
    console.error('❌ Video file not found:', VIDEO_FILE);
    console.log('Please make sure V8.mp4 is in public/assets/');
    return;
  }
  
  // Check if config is set
  if (BUNNY_CONFIG.apiKey === 'YOUR_BUNNY_API_KEY') {
    console.log('⚠️  Please configure your BunnyCDN credentials first:');
    console.log('1. Sign up at https://bunny.net');
    console.log('2. Create a Storage Zone');
    console.log('3. Get your API key and Storage Zone name');
    console.log('4. Update the BUNNY_CONFIG in this file');
    return;
  }
  
  try {
    const fileBuffer = fs.readFileSync(VIDEO_FILE);
    const fileSize = fileBuffer.length;
    
    console.log(`📁 File size: ${(fileSize / 1024 / 1024).toFixed(2)} MB`);
    
    // Upload to BunnyCDN
    const uploadUrl = `https://storage.bunnycdn.com/${BUNNY_CONFIG.storageZone}${BUNNY_CONFIG.videoPath}`;
    
    const options = {
      method: 'PUT',
      headers: {
        'AccessKey': BUNNY_CONFIG.apiKey,
        'Content-Type': 'video/mp4',
        'Content-Length': fileSize
      }
    };
    
    console.log('📤 Uploading to BunnyCDN...');
    
    const req = https.request(uploadUrl, options, (res) => {
      if (res.statusCode === 201) {
        console.log('✅ Video uploaded successfully!');
        console.log(`🌐 CDN URL: https://${BUNNY_CONFIG.storageZone}.b-cdn.net${BUNNY_CONFIG.videoPath}`);
        console.log('📋 Update your video sources with this URL');
      } else {
        console.error('❌ Upload failed:', res.statusCode, res.statusMessage);
      }
    });
    
    req.on('error', (error) => {
      console.error('❌ Upload error:', error.message);
    });
    
    req.write(fileBuffer);
    req.end();
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Alternative: Upload to Cloudinary (easier setup)
async function uploadToCloudinary() {
  console.log('☁️  Alternative: Upload to Cloudinary');
  console.log('1. Sign up at https://cloudinary.com (free tier)');
  console.log('2. Upload V8.mp4 manually to your media library');
  console.log('3. Get the public URL from Cloudinary');
  console.log('4. Use that URL in your video sources');
}

// Run the upload
if (require.main === module) {
  console.log('🎬 PowerUp & Win Video Upload Tool');
  console.log('=====================================');
  console.log('');
  console.log('Choose your CDN:');
  console.log('1. BunnyCDN (recommended - fast & cheap)');
  console.log('2. Cloudinary (easier setup)');
  console.log('');
  
  // For now, show Cloudinary instructions (easier)
  uploadToCloudinary();
}

module.exports = { uploadToBunnyCDN, uploadToCloudinary };
