#!/bin/bash

# Azure Deployment Script for PowerUp & Win App
# This script automates the Azure deployment process

set -e

echo "🚀 Starting Azure deployment for PowerUp & Win app..."

# Configuration
RESOURCE_GROUP="powerup-rg"
APP_NAME="powerup-app-$(date +%s)"
STORAGE_ACCOUNT="powerupstorage$(date +%s)"
LOCATION="eastus"

echo "📋 Configuration:"
echo "  Resource Group: $RESOURCE_GROUP"
echo "  App Name: $APP_NAME"
echo "  Storage Account: $STORAGE_ACCOUNT"
echo "  Location: $LOCATION"

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI not found. Please install it first:"
    echo "   https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

# Check if logged in to Azure
if ! az account show &> /dev/null; then
    echo "🔐 Please log in to Azure:"
    az login
fi

echo "✅ Azure CLI ready"

# Create resource group
echo "📦 Creating resource group..."
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create storage account for video files
echo "💾 Creating storage account for video files..."
az storage account create \
    --name $STORAGE_ACCOUNT \
    --resource-group $RESOURCE_GROUP \
    --location $LOCATION \
    --sku Standard_LRS

# Create container for videos
echo "📁 Creating blob container..."
az storage container create \
    --name videos \
    --account-name $STORAGE_ACCOUNT \
    --public-access blob

# Upload your V8.mp4 video to Azure Blob Storage
echo "📹 Uploading your V8.mp4 video to Azure Blob Storage..."
if [ -f "public/assets/V8.mp4" ]; then
    echo "   Found your video file: public/assets/V8.mp4"
    az storage blob upload \
      --account-name $STORAGE_ACCOUNT \
      --container-name videos \
      --name V8.mp4 \
      --file public/assets/V8.mp4 \
      --overwrite
    echo "✅ Your V8.mp4 video uploaded successfully to Azure"
    VIDEO_URL="https://$STORAGE_ACCOUNT.blob.core.windows.net/videos/V8.mp4"
    echo "   Video URL: $VIDEO_URL"
else
    echo "⚠️ Your V8.mp4 video file not found at public/assets/V8.mp4"
    echo "   The app will use external fallback videos only"
    VIDEO_URL=""
fi

# Create App Service plan
echo "🏗️ Creating App Service plan..."
az appservice plan create \
    --name powerup-plan \
    --resource-group $RESOURCE_GROUP \
    --sku B1 \
    --is-linux

# Create web app
echo "🌐 Creating web app..."
az webapp create \
    --resource-group $RESOURCE_GROUP \
    --plan powerup-plan \
    --name $APP_NAME \
    --runtime "NODE|18-lts"

# Configure app settings
echo "⚙️ Configuring app settings..."
if [ -n "$VIDEO_URL" ]; then
    echo "   Using Azure Blob Storage video: $VIDEO_URL"
    az webapp config appsettings set \
        --resource-group $RESOURCE_GROUP \
        --name $APP_NAME \
        --settings \
            NODE_ENV=production \
            PORT=8080 \
            VIDEO_URL="$VIDEO_URL" \
            WEBSITE_NODE_DEFAULT_VERSION=18.17.0
else
    echo "   Using fallback video sources"
    az webapp config appsettings set \
        --resource-group $RESOURCE_GROUP \
        --name $APP_NAME \
        --settings \
            NODE_ENV=production \
            PORT=8080 \
            WEBSITE_NODE_DEFAULT_VERSION=18.17.0
fi

# Enable CORS for the web app
echo "🔒 Configuring CORS..."
az webapp cors add \
    --resource-group $RESOURCE_GROUP \
    --name $APP_NAME \
    --allowed-origins "*"

# Create deployment package
echo "📦 Creating deployment package..."
if [ -d "dist" ]; then
    echo "Using existing dist folder"
else
    echo "Building React app..."
    npm run build
fi

# Create deployment zip
zip -r powerup-deployment.zip . -x "node_modules/*" "*.git*" "azure-*" "*.md"

# Deploy to Azure
echo "🚀 Deploying to Azure..."
az webapp deployment source config-zip \
    --resource-group $RESOURCE_GROUP \
    --name $APP_NAME \
    --src powerup-deployment.zip

# Get the app URL
APP_URL=$(az webapp show --resource-group $RESOURCE_GROUP --name $APP_NAME --query defaultHostName -o tsv)
FULL_URL="https://$APP_URL"

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "📱 Your app is available at: $FULL_URL"
echo "🔧 Admin dashboard: $FULL_URL/admin-dashboard.html"
echo ""
echo "📋 Next steps:"
echo "1. Upload your V8.mp4 video to Azure Blob Storage:"
echo "   az storage blob upload --account-name $STORAGE_ACCOUNT --container-name videos --name V8.mp4 --file /path/to/V8.mp4"
echo ""
echo "2. Test your application at: $FULL_URL"
echo ""
echo "💡 To view logs:"
echo "   az webapp log tail --resource-group $RESOURCE_GROUP --name $APP_NAME"
echo ""
echo "🗑️ To delete resources when done:"
echo "   az group delete --name $RESOURCE_GROUP --yes"

# Save deployment info
cat > deployment-info.txt << EOF
Deployment Information
=====================
App Name: $APP_NAME
Resource Group: $RESOURCE_GROUP
Storage Account: $STORAGE_ACCOUNT
App URL: $FULL_URL
Admin URL: $FULL_URL/admin-dashboard.html
Deployment Date: $(date)
EOF

echo "📄 Deployment info saved to deployment-info.txt"
