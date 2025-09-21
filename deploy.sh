#!/bin/bash

# PowerUp & Win Deployment Script
echo "🚀 PowerUp & Win Deployment Script"
echo "=================================="

# Build the project
echo "📦 Building production version..."
npm run build

# Create deployment package
echo "📁 Creating deployment package..."
mkdir -p deployment
cp -r dist/* deployment/
cp -r public/* deployment/
cp DEPLOYMENT_GUIDE.md deployment/

echo "✅ Deployment package ready!"
echo "📂 Upload the 'deployment' folder to your hosting provider"
echo "🌐 Your domain: www.powerupandwin.co.za"
echo ""
echo "📋 Next steps:"
echo "1. Choose a hosting provider (Netlify, Vercel, or your own server)"
echo "2. Upload the 'deployment' folder contents"
echo "3. Configure your domain DNS settings"
echo "4. Enable SSL/HTTPS"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"





