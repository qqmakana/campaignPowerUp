#!/usr/bin/env node

/**
 * Railway Build Script
 * This script ensures the React app is built before starting the server
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Railway Build Script Starting...');

try {
  // Check if dist directory exists
  const distPath = path.join(__dirname, 'dist');
  
  if (fs.existsSync(distPath)) {
    console.log('📁 Dist directory exists, checking contents...');
    const contents = fs.readdirSync(distPath);
    console.log('Dist contents:', contents);
    
    // Check if assets directory exists
    const assetsPath = path.join(distPath, 'assets');
    if (fs.existsSync(assetsPath)) {
      const assets = fs.readdirSync(assetsPath);
      console.log('Assets contents:', assets);
      
      // Check for JavaScript files
      const jsFiles = assets.filter(file => file.endsWith('.js'));
      if (jsFiles.length > 0) {
        console.log('✅ JavaScript files found:', jsFiles);
        console.log('✅ Build appears to be complete');
        return;
      }
    }
  }
  
  console.log('🔨 Building React app...');
  
  // Install dependencies if needed
  if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
  }
  
  // Build the React app
  console.log('🏗️ Running npm run build...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Verify build
  if (fs.existsSync(distPath)) {
    console.log('✅ Build completed successfully');
    const contents = fs.readdirSync(distPath);
    console.log('Final dist contents:', contents);
  } else {
    console.log('❌ Build failed - dist directory not created');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Build script failed:', error.message);
  process.exit(1);
}
