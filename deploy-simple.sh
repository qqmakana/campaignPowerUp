#!/bin/bash

# PowerUp & Win - Simple Deployment Script
echo "🚀 PowerUp & Win Deployment Script"
echo "=================================="

# Step 1: Build the frontend
echo "📦 Building frontend..."
npm run build

# Step 2: Create deployment package
echo "📁 Creating deployment package..."
mkdir -p deployment-package
cp -r dist/* deployment-package/

# Step 3: Copy admin files
echo "🔐 Adding admin files..."
cp public/admin-secure.html deployment-package/
cp public/admin-dashboard.html deployment-package/

# Step 4: Create backend package
echo "⚙️ Preparing backend package..."
mkdir -p backend-deployment
cp -r backend/* backend-deployment/

# Step 5: Create deployment instructions
echo "📋 Creating deployment instructions..."
cat > deployment-package/DEPLOY_INSTRUCTIONS.txt << EOF
PowerUp & Win - Deployment Instructions
======================================

FRONTEND DEPLOYMENT:
1. Upload all files in this folder to your web hosting
2. Make sure index.html is in the root directory
3. Test: Visit your domain

BACKEND DEPLOYMENT:
1. Upload backend-deployment/ folder to your server
2. Run: npm install && npm start
3. Test: Visit your-domain.com/api/health

ADMIN ACCESS:
- URL: your-domain.com/admin-secure.html
- Username: admin
- Password: powerup2024 (CHANGE THIS!)

SECURITY:
- Change the default password in admin-secure.html
- Use HTTPS for production
- Backup your data regularly

SUPPORT:
- Check DEPLOYMENT_STEPS.md for detailed instructions
- Test all functionality before going live
EOF

echo "✅ Deployment package created!"
echo "📁 Frontend files: deployment-package/"
echo "📁 Backend files: backend-deployment/"
echo "📋 Instructions: deployment-package/DEPLOY_INSTRUCTIONS.txt"
echo ""
echo "🎯 Next Steps:"
echo "1. Upload deployment-package/ to your web hosting"
echo "2. Upload backend-deployment/ to your server"
echo "3. Test everything works"
echo "4. Change the admin password"
echo "5. Go live!"
echo ""
echo "🚀 Your PowerUp & Win app is ready for deployment!"


