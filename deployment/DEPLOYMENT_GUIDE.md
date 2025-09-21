# PowerUp & Win - Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Netlify (Recommended - Free & Easy)
1. Go to [netlify.com](https://netlify.com)
2. Sign up for free account
3. Drag and drop the `dist` folder to deploy
4. Add custom domain: `www.powerupandwin.co.za`
5. Your site will be live in minutes!

### Option 2: Vercel (Free & Fast)
1. Go to [vercel.com](https://vercel.com)
2. Sign up for free account
3. Import your GitHub repository or drag `dist` folder
4. Add custom domain: `www.powerupandwin.co.za`
5. Deploy with one click!

### Option 3: GitHub Pages (Free)
1. Create GitHub repository
2. Upload all files to repository
3. Enable GitHub Pages in settings
4. Add custom domain in repository settings

## 📁 Files to Upload

Upload these files to your hosting provider:
- `dist/` folder (contains the built app)
- `public/` folder (contains assets like logo and video)

## 🔧 Domain Configuration

### DNS Settings for www.powerupandwin.co.za:
- **A Record**: Point to your hosting provider's IP
- **CNAME**: www → your-hosting-provider.com
- **SSL Certificate**: Enable HTTPS (most providers do this automatically)

## ✏️ How to Edit After Deployment

### Method 1: Direct File Editing
1. Download the source files from your hosting provider
2. Make changes to the files
3. Re-upload the modified files
4. Your changes will be live immediately

### Method 2: Version Control (Recommended)
1. Use Git to track changes
2. Push changes to your repository
3. Your hosting provider will auto-deploy updates

### Method 3: Online Editor
1. Use your hosting provider's online file editor
2. Edit files directly in the browser
3. Save changes instantly

## 📱 Features Included

✅ **Responsive Design** - Works on all devices
✅ **Animated Video** - Left side video with loop
✅ **Professional Logo** - Top-right corner positioning
✅ **Contact Form** - Inline form with data storage
✅ **Admin Dashboard** - View submissions at `/admin.html`
✅ **Data Storage** - Form submissions saved locally
✅ **Professional Styling** - Modern, clean design

## 🔗 Important URLs

- **Main App**: `https://www.powerupandwin.co.za/`
- **Admin Dashboard**: `https://www.powerupandwin.co.za/admin.html`
- **Agreement Form**: Built into the main page

## 📊 Data Management

Form submissions are stored in:
- **Browser Local Storage** (persistent)
- **Session Storage** (current session)
- **Admin Dashboard** for viewing/exporting data

## 🛠️ Technical Details

- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Size**: ~263KB (optimized)

## 📞 Support

If you need help with deployment or editing:
1. Check this guide first
2. Contact your hosting provider
3. Refer to the source code comments

---

**Ready to go live!** 🎉
