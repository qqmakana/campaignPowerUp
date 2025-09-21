# 🚀 Quick CDN Setup Guide - Fix Railway Deployment

## **Problem**: V8.mp4 (255.70 MB) too large for Railway deployment
## **Solution**: Upload video to CDN and update sources

---

## **Option 1: Cloudinary (Easiest - 5 minutes)**

### **Step 1: Sign Up**
1. Go to https://cloudinary.com
2. Click "Sign Up" (free tier available)
3. Verify your email

### **Step 2: Upload Video**
1. Login to Cloudinary dashboard
2. Click "Media Library"
3. Click "Upload" button
4. Select your `public/assets/V8.mp4` file
5. Wait for upload to complete

### **Step 3: Get URL**
1. Click on your uploaded video
2. Copy the "Public URL" (looks like: `https://res.cloudinary.com/your-cloud/video/upload/v1234567890/V8.mp4`)
3. Copy this URL

### **Step 4: Update Code**
Replace in `src/config.ts`:
```typescript
// Change this line:
"https://your-cdn-url.com/videos/V8.mp4", // Replace with your CDN URL

// To your actual Cloudinary URL:
"https://res.cloudinary.com/your-cloud/video/upload/v1234567890/V8.mp4",
```

---

## **Option 2: BunnyCDN (Cheapest - 10 minutes)**

### **Step 1: Sign Up**
1. Go to https://bunny.net
2. Click "Get Started" (free tier available)
3. Verify your email

### **Step 2: Create Storage Zone**
1. Login to BunnyCDN dashboard
2. Go to "Storage" → "Storage Zones"
3. Click "Add Storage Zone"
4. Name it "powerup-videos"
5. Choose region (US East recommended)
6. Click "Add Storage Zone"

### **Step 3: Upload Video**
1. Click on your storage zone
2. Click "Upload Files"
3. Select your `public/assets/V8.mp4` file
4. Wait for upload

### **Step 4: Get URL**
1. Click on your uploaded file
2. Copy the URL (looks like: `https://powerup-videos.b-cdn.net/V8.mp4`)

### **Step 5: Update Code**
Replace in `src/config.ts`:
```typescript
// Change this line:
"https://your-cdn-url.com/videos/V8.mp4", // Replace with your CDN URL

// To your actual BunnyCDN URL:
"https://powerup-videos.b-cdn.net/V8.mp4",
```

---

## **Step 5: Remove Large File from Git**

After uploading to CDN:

```bash
# Remove video from Git
git rm --cached public/assets/V8.mp4

# Add to .gitignore
echo "public/assets/V8.mp4" >> .gitignore

# Commit changes
git add .
git commit -m "Remove large video file, use CDN instead"

# Push to Railway
git push origin main
```

---

## **Step 6: Test Deployment**

1. **Build locally**: `npm run build`
2. **Check video**: Open `dist/index.html` in browser
3. **Deploy**: Push to Railway
4. **Test**: Visit https://campaignpowerup-production.up.railway.app

---

## **Expected Result**

✅ **Video plays from CDN** (fast loading)  
✅ **Railway deployment works** (no large files)  
✅ **App loads correctly** (all assets served)  
✅ **Forms work** (API endpoints accessible)  

---

## **Cost Comparison**

| CDN | Free Tier | Cost After Free |
|-----|-----------|-----------------|
| **Cloudinary** | 25 GB storage, 25 GB bandwidth | $89/month |
| **BunnyCDN** | 1 GB storage, 1 GB bandwidth | $1/month per GB |

**Recommendation**: Start with Cloudinary (easier), then migrate to BunnyCDN if you need more bandwidth.

---

## **Quick Start (Recommended)**

1. **Use Cloudinary** (5 minutes setup)
2. **Upload V8.mp4** to Cloudinary
3. **Copy the URL** from Cloudinary
4. **Update `src/config.ts`** with your URL
5. **Remove video from Git** and push to Railway

**Your app will be live and working! 🎉**
