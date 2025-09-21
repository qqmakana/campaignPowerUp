# Azure Deployment Guide for PowerUp & Win App

## Problem Summary

### Current Issues
1. **Large File Problem**: V8.mp4 (255.70 MB) exceeds GitHub's 100 MB limit
2. **Railway Deployment Failures**: 502 errors, white screens, video not displaying
3. **Git History Pollution**: Large files causing repository issues
4. **Environment Mismatch**: Local works, production fails

### Solution: Azure App Service with Blob Storage

## Deployment Strategy

### Option 1: Azure App Service (Recommended)
- **Frontend**: React app deployed to Azure App Service
- **Backend**: Node.js API deployed to Azure App Service
- **Video Storage**: Azure Blob Storage for V8.mp4
- **Admin Dashboard**: Static files served from App Service

### Option 2: Azure Container Instances
- **Full Stack**: Docker container with Nginx
- **Video Storage**: Azure Blob Storage
- **Simpler**: Single container deployment

## Step-by-Step Azure Deployment

### Prerequisites
1. Azure account (free tier available)
2. Azure CLI installed
3. Your app code ready

### Step 1: Prepare Your Application

#### A. Create Azure-specific Configuration
```bash
# Create Azure deployment folder
mkdir azure-deployment
cd azure-deployment

# Copy your app files
cp -r ../src .
cp -r ../backend .
cp -r ../public .
cp ../package.json .
cp ../Dockerfile .
```

#### B. Update Video Configuration
```typescript
// In src/App.tsx, update video source to Azure Blob Storage
const VIDEO_MP4 = "https://yourstorageaccount.blob.core.windows.net/videos/V8.mp4";
```

### Step 2: Set Up Azure Resources

#### A. Create Resource Group
```bash
az group create --name powerup-rg --location eastus
```

#### B. Create Storage Account for Video
```bash
az storage account create \
  --name powerupstorage \
  --resource-group powerup-rg \
  --location eastus \
  --sku Standard_LRS
```

#### C. Upload Video to Blob Storage
```bash
# Get storage key
az storage account keys list --account-name powerupstorage --resource-group powerup-rg

# Create container
az storage container create --name videos --account-name powerupstorage

# Upload video (you'll need to add the video file back temporarily)
az storage blob upload \
  --account-name powerupstorage \
  --container-name videos \
  --name V8.mp4 \
  --file /path/to/V8.mp4
```

### Step 3: Deploy to Azure App Service

#### A. Create App Service Plan
```bash
az appservice plan create \
  --name powerup-plan \
  --resource-group powerup-rg \
  --sku B1 \
  --is-linux
```

#### B. Create Web App
```bash
az webapp create \
  --resource-group powerup-rg \
  --plan powerup-plan \
  --name powerup-app \
  --runtime "NODE|18-lts"
```

#### C. Configure App Settings
```bash
# Set environment variables
az webapp config appsettings set \
  --resource-group powerup-rg \
  --name powerup-app \
  --settings \
    NODE_ENV=production \
    PORT=8080 \
    VIDEO_URL=https://powerupstorage.blob.core.windows.net/videos/V8.mp4
```

### Step 4: Deploy Code

#### Option A: Direct Git Deployment
```bash
# Initialize git in your project
git init
git add .
git commit -m "Azure deployment ready"

# Add Azure remote
az webapp deployment source config \
  --resource-group powerup-rg \
  --name powerup-app \
  --repo-url https://github.com/yourusername/yourrepo.git \
  --branch main \
  --manual-integration
```

#### Option B: ZIP Deployment
```bash
# Create deployment package
zip -r powerup-deployment.zip . -x "node_modules/*" "*.git*"

# Deploy
az webapp deployment source config-zip \
  --resource-group powerup-rg \
  --name powerup-app \
  --src powerup-deployment.zip
```

### Step 5: Configure Custom Domain (Optional)
```bash
# Add custom domain
az webapp config hostname add \
  --webapp-name powerup-app \
  --resource-group powerup-rg \
  --hostname yourdomain.com
```

## Alternative: Azure Container Instances

### Create Container Instance
```bash
# Build and push to Azure Container Registry
az acr create --name powerupregistry --resource-group powerup-rg --sku Basic
az acr login --name powerupregistry

# Build and push image
docker build -t powerupregistry.azurecr.io/powerup-app:latest .
docker push powerupregistry.azurecr.io/powerup-app:latest

# Create container instance
az container create \
  --resource-group powerup-rg \
  --name powerup-container \
  --image powerupregistry.azurecr.io/powerup-app:latest \
  --cpu 1 \
  --memory 1 \
  --ports 80 \
  --environment-variables \
    NODE_ENV=production \
    VIDEO_URL=https://powerupstorage.blob.core.windows.net/videos/V8.mp4
```

## Benefits of Azure Deployment

1. **Large File Support**: Azure Blob Storage handles files up to 5 TB
2. **Reliable**: 99.9% SLA for App Service
3. **Scalable**: Auto-scaling based on demand
4. **Cost-Effective**: Pay-as-you-go pricing
5. **Easy Management**: Azure Portal for monitoring
6. **Global CDN**: Fast video delivery worldwide

## Cost Estimation

- **App Service (B1)**: ~$13/month
- **Blob Storage (5GB)**: ~$0.10/month
- **Bandwidth**: ~$0.09/GB
- **Total**: ~$15-20/month for small traffic

## Next Steps

1. Choose deployment method (App Service or Container Instances)
2. Set up Azure account and CLI
3. Follow the step-by-step guide above
4. Test the deployed application
5. Configure monitoring and alerts

## Troubleshooting

### Common Issues
1. **Video not loading**: Check blob storage URL and permissions
2. **App not starting**: Check Node.js version and environment variables
3. **CORS errors**: Configure CORS in backend
4. **Performance**: Enable Azure CDN for video delivery

### Monitoring
- Use Azure Application Insights
- Set up alerts for errors and performance
- Monitor storage usage and costs
