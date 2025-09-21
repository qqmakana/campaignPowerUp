# 🐳 PowerUp & Win - Docker Deployment Guide

## 🚀 **Quick Start (3 Commands)**

```bash
# 1. Build the Docker image
docker-compose build

# 2. Start the app
docker-compose up -d

# 3. Open your browser
open http://localhost:3000
```

**That's it!** Your PowerUp & Win app is now running! 🎉

---

## 📋 **What Docker Gives You**

✅ **Perfect Video Looping** - Your V8.html video will play in a continuous loop  
✅ **Professional Logo** - Your PowerUp & Win logo displays perfectly  
✅ **Form Data Storage** - All submissions are saved and accessible  
✅ **Easy Updates** - Just rebuild and restart  
✅ **Works Anywhere** - Runs on any server with Docker  
✅ **Production Ready** - Optimized for performance  

---

## 🛠 **Detailed Setup**

### **Prerequisites**
- Docker installed ([Download here](https://docs.docker.com/get-docker/))
- Docker Compose installed (usually comes with Docker)

### **Step 1: Build the App**
```bash
# Build the Docker image
docker-compose build
```

### **Step 2: Start the App**
```bash
# Start in background
docker-compose up -d

# Or start with logs visible
docker-compose up
```

### **Step 3: Access Your App**
- **Main App**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin

---

## 🔧 **Useful Commands**

```bash
# View logs
docker-compose logs -f

# Stop the app
docker-compose down

# Restart the app
docker-compose restart

# Update the app (after making changes)
docker-compose up --build -d

# View running containers
docker ps
```

---

## 🌐 **Deploy to Production Server**

### **Option 1: Any Server with Docker**
1. Copy your entire project folder to the server
2. SSH into the server
3. Run: `./deploy-docker.sh`
4. Your app will be available on port 3000

### **Option 2: Cloud Platforms**
- **DigitalOcean**: Create a droplet, install Docker, upload your files
- **AWS EC2**: Launch instance, install Docker, upload your files  
- **Google Cloud**: Create VM, install Docker, upload your files
- **Azure**: Create VM, install Docker, upload your files

### **Option 3: Docker Hosting**
- **Railway**: Connect your GitHub repo
- **Render**: Deploy from Dockerfile
- **Fly.io**: Deploy with `fly deploy`

---

## 📁 **Project Structure**

```
kayleApp/
├── Dockerfile              ← Docker configuration
├── docker-compose.yml      ← Easy deployment
├── nginx.conf             ← Web server config
├── deploy-docker.sh       ← One-click deployment
├── src/                   ← Your React app
├── public/assets/         ← Your videos and logos
└── deployment/            ← Static files (alternative)
```

---

## 🎯 **Key Features**

### **Video Looping**
- Your `V8.html` video plays in a perfect loop
- Optimized for performance
- Works on all devices

### **Logo Display**
- Your `PowerUp&Win Logo.html` displays perfectly
- Responsive design
- Professional glow effects

### **Form Submissions**
- All form data is stored locally
- Access via admin dashboard
- Ready for database integration

### **Performance**
- Nginx web server
- Gzip compression
- Static asset caching
- Mobile optimized

---

## 🔄 **Making Updates**

1. **Edit your files** (src/, public/, etc.)
2. **Rebuild the image**: `docker-compose build`
3. **Restart the app**: `docker-compose up -d`
4. **Your changes are live!** 🎉

---

## 🆘 **Troubleshooting**

### **App won't start?**
```bash
# Check logs
docker-compose logs

# Rebuild from scratch
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### **Video not playing?**
- Check that `V8.html` is in `public/assets/`
- Ensure the file is not corrupted
- Try opening it directly in browser

### **Logo not showing?**
- Check that `PowerUp&Win Logo.html` is in `public/assets/`
- Verify the HTML file is valid
- Check browser console for errors

### **Form not working?**
- Check browser console for errors
- Ensure all required fields are filled
- Check that localStorage is enabled

---

## 🎉 **Success!**

Your PowerUp & Win app is now running in Docker! 

- **Main App**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **Form Submissions**: Check the admin dashboard

**Ready to deploy to production?** Just copy your files to any server with Docker and run `./deploy-docker.sh`! 🚀



