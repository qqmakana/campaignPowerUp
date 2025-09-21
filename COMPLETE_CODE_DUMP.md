# 🚨 COMPLETE CODE DUMP - Railway Deployment Issue

## **Problem**: App works locally but shows white screen on Railway
## **URL**: https://campaignpowerup-production.up.railway.app
## **Status**: ❌ **CRITICAL - NEEDS IMMEDIATE FIX**

---

## **📁 Complete File Structure**
```
kayleApp/
├── src/App.tsx (React main component)
├── src/config.ts (Video configuration)
├── backend/server.js (API server)
├── server.js (Railway deployment server)
├── package.json (Dependencies and scripts)
├── railway.json (Railway configuration)
├── Dockerfile (Docker configuration)
├── dist/ (Built React app)
│   ├── index.html
│   └── assets/
│       └── index-[hash].js
└── public/assets/V8.mp4 (Large video file - excluded from Git)
```

---

## **📄 ALL FILES - COMPLETE CODE**

### **1. server.js (Railway Deployment Server)**
```javascript
const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Debug logging
console.log('🔍 Debug Info:');
console.log('Current directory:', __dirname);
console.log('Dist directory exists:', fs.existsSync(path.join(__dirname, 'dist')));
console.log('Dist contents:', fs.existsSync(path.join(__dirname, 'dist')) ? fs.readdirSync(path.join(__dirname, 'dist')) : 'NOT FOUND');

// Enable CORS
app.use(cors());

// Serve static files from the dist directory (React build)
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1d',
  etag: false
}));

// API routes - import the backend routes
const backendApp = require('./backend/server');
app.use('/api', backendApp);

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 PowerUp & Win app running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
});
```

### **2. package.json (Dependencies and Scripts)**
```json
{
  "name": "powerup-win-landing",
  "version": "1.0.0",
  "description": "PowerUp & Win landing page",
  "main": "index.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "start": "node server.js",
    "build:full": "npm run build && npm run build:backend",
    "build:backend": "echo 'Backend already built'",
    "postinstall": "npm run build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.4",
    "lucide-react": "^0.292.0",
    "express": "^4.18.2",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@vitejs/plugin-react": "^4.1.0",
    "typescript": "^5.2.2",
    "vite": "^4.5.0"
  }
}
```

### **3. railway.json (Railway Configuration)**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### **4. Dockerfile (Docker Configuration)**
```dockerfile
# Multi-stage build for Railway deployment
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy built app from builder stage
COPY --from=builder /app/dist ./dist

# Copy server files
COPY server.js ./
COPY backend/ ./backend/

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
```

### **5. src/App.tsx (React Main Component)**
```typescript
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Trophy, Calendar, Shield, Store } from "lucide-react";
import { config, videoManager } from "./config";

// ---- Assets (placeholder paths - you can replace with actual assets) ----
// Use video sources from configuration
const VIDEO_SOURCES = config.VIDEO_SOURCES;
const VIDEO_MP4 = videoManager.getCurrentSource(); // Primary video source
const LOGO_RAW  = "/assets/PowerUpWin-Logo.png";         // PNG logo
const AGREEMENT_DOC = "/assets/agreement-template.html";

export default function PowerUpWinLanding() {
  // Cursor + parallax (browser-only)
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ dx: 0, dy: 0 });
  const [logoSrc, setLogoSrc] = useState(LOGO_RAW);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
      const w = window.innerWidth || 1, h = window.innerHeight || 1;
      setParallax({ dx: (e.clientX - w / 2) * 0.005, dy: (e.clientY - h / 2) * 0.005 });
    };

    const onScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Show the logo while the video buffers
  const poster = useMemo(() => logoSrc, [logoSrc]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white font-sans">
      {/* HERO: Large video section (more than half screen) */}
      <header className="relative h-[70vh] w-full overflow-hidden">
        {/* Large video background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            title="PowerUp & Win video"
            id="main-video"
            poster="/assets/PowerUpWin-Logo.png"
            onLoadStart={() => console.log("Video loading started")}
            onCanPlay={() => console.log("Video can play")}
            onError={(e) => {
              console.error("Video error:", e);
              const video = e.target as HTMLVideoElement;
              
              // Try next video source using video manager
              const nextSrc = videoManager.tryNextSource();
              
              if (nextSrc) {
                console.log(`Trying next video source: ${nextSrc}`);
                video.src = nextSrc;
                video.load();
              } else {
                // All sources failed, show fallback
                console.log("All video sources failed, showing fallback");
                video.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center';
                fallback.innerHTML = `
                  <div class="text-center">
                    <h1 class="text-4xl font-bold text-white mb-4">PowerUp & Win</h1>
                    <p class="text-xl text-gray-300 mb-6">UMS Northern Division</p>
                    <div class="animate-pulse">
                      <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4"></div>
                      <p class="text-sm text-gray-400">Loading experience...</p>
                    </div>
                  </div>
                `;
                video.parentNode?.appendChild(fallback);
              }
            }}
          >
            {/* Your video file as primary source */}
            <source src="/assets/V8.mp4" type="video/mp4" />
            {/* Fallback sources only if your video fails */}
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Subtle gradient for smooth transition */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
        </div>

        {/* Animated background layers */}
        <div className="absolute inset-0 z-10">
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content overlay */}
        <div className="relative z-20 flex h-full items-center justify-center">
          <div className="text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <img
                src={logoSrc}
                alt="PowerUp & Win Logo"
                className="mx-auto h-24 w-auto"
                onError={() => setLogoSrc("/assets/PowerUpWin-Logo.png")}
              />
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 text-5xl font-bold text-white md:text-7xl"
            >
              PowerUp & Win
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 text-xl text-gray-300 md:text-2xl"
            >
              UMS Northern Division
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button
                onClick={() => document.getElementById('agreement-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                Join PowerUp & Win
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* CONTENT: Smart transition with black background */}
      <section className="relative bg-black py-16">
        {/* Content container */}
        <div className="mx-auto max-w-6xl px-4">
          {/* Main content grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left: Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Power Your Store</h2>
              <p className="text-lg text-gray-300">
                Join the PowerUp & Win campaign and unlock exclusive benefits for your business.
              </p>
              
              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  <span className="text-white">Exclusive prizes and rewards</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-white">Insurance coverage included</span>
                </div>
                <div className="flex items-center gap-3">
                  <Store className="h-5 w-5 text-blue-400" />
                  <span className="text-white">Boost your store performance</span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="rounded-lg bg-gray-900 p-6">
              <h3 className="mb-4 text-xl font-semibold text-white">Get Started</h3>
              <form id="agreement-form" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Full Name</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Email</label>
                  <input
                    type="email"
                    className="mt-1 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Store Name</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your store name"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 font-semibold text-white transition-all duration-300 hover:scale-105"
                >
                  Join Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center text-gray-400">
              <p>PowerUp & Win © 2025</p>
              <p>UMS Northern Division</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">🏆 Prize not transferable for cash</span>
              <span className="text-sm text-gray-500">🛡️ Insurance covered by UMS until 28 Mar 2025</span>
            </div>
            <a
              href="/admin-dashboard.html"
              className="text-xs text-gray-500 hover:text-gray-400 transition-colors duration-200 opacity-50 hover:opacity-70"
              title="Admin Access"
            >
              Admin
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

### **6. src/config.ts (Video Configuration)**
```typescript
// Environment configuration for PowerUp & Win app
// This file handles environment variables safely for both browser and Node.js

interface AppConfig {
  API_BASE: string;
  VIDEO_SOURCES: string[];
  NODE_ENV: 'development' | 'production';
  IS_LOCAL: boolean;
}

// Safe environment detection
const isLocal = typeof window !== 'undefined' 
  ? window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  : process?.env?.NODE_ENV === 'development';

const isProduction = typeof window !== 'undefined'
  ? !isLocal
  : process?.env?.NODE_ENV === 'production';

// Video sources configuration with FREE external videos
const VIDEO_SOURCES = [
  // Free external videos (no setup needed - 100% free)
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
  
  // Local fallback (for development only)
  "/assets/V8.mp4"
].filter(Boolean);

// API configuration
const getApiBase = (): string => {
  if (typeof window !== 'undefined') {
    // Browser environment
    return isLocal 
      ? 'http://localhost:3001' 
      : 'https://api.powerupandwin.co.za';
  } else {
    // Node.js environment
    return process?.env?.API_BASE || 'http://localhost:3001';
  }
};

export const config: AppConfig = {
  API_BASE: getApiBase(),
  VIDEO_SOURCES,
  NODE_ENV: isProduction ? 'production' : 'development',
  IS_LOCAL: isLocal
};

// Export individual configs for convenience
export const { API_BASE, VIDEO_SOURCES: VIDEO_SOURCES_CONFIG, NODE_ENV, IS_LOCAL } = config;

// Video management utilities
export class VideoManager {
  private static instance: VideoManager;
  private currentSourceIndex = 0;
  
  static getInstance(): VideoManager {
    if (!VideoManager.instance) {
      VideoManager.instance = new VideoManager();
    }
    return VideoManager.instance;
  }
  
  getCurrentSource(): string {
    return VIDEO_SOURCES_CONFIG[this.currentSourceIndex];
  }
  
  getAllSources(): string[] {
    return [...VIDEO_SOURCES_CONFIG];
  }
  
  tryNextSource(): string | null {
    if (this.currentSourceIndex < VIDEO_SOURCES_CONFIG.length - 1) {
      this.currentSourceIndex++;
      return this.getCurrentSource();
    }
    return null;
  }
  
  reset(): void {
    this.currentSourceIndex = 0;
  }
  
  async checkSourceAccessibility(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.warn(`Video source ${url} not accessible:`, error);
      return false;
    }
  }
}

// Export video manager instance
export const videoManager = VideoManager.getInstance();
```

### **7. backend/server.js (API Server)**
```javascript
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data storage file
const DATA_FILE = path.join(__dirname, 'data', 'submissions.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch (error) {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Submit form data
app.post('/api/submit', async (req, res) => {
  try {
    await ensureDataDir();
    
    const submissionData = {
      ...req.body,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString()
    };
    
    // Read existing data
    let submissions = [];
    try {
      const data = await fs.readFile(DATA_FILE, 'utf8');
      submissions = JSON.parse(data);
    } catch (error) {
      // File doesn't exist, start with empty array
      submissions = [];
    }
    
    // Add new submission
    submissions.push(submissionData);
    
    // Save to file
    await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2));
    
    res.json({ 
      success: true, 
      message: 'Submission received successfully',
      id: submissionData.id
    });
    
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save submission',
      error: error.message
    });
  }
});

// Get all submissions (for admin)
app.get('/api/submissions', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const submissions = JSON.parse(data);
    res.json(submissions);
  } catch (error) {
    res.json([]);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 PowerUp & Win API running on port ${PORT}`);
  console.log(`📊 Data stored in: ${DATA_FILE}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
```

### **8. dist/index.html (Built HTML)**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PowerUp & Win - UMS Northern Division</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="module" crossorigin src="/assets/index-1b47889a.js"></script>
  </head>
  <body>
    <div id="root"></div>
    
  </body>
</html>
```

---

## **🚨 CURRENT ISSUES**

### **Problem 1: Static File Serving**
- **Issue**: JavaScript files return 404 on Railway
- **Local**: ✅ Works perfectly
- **Railway**: ❌ Returns 404 for `/assets/index-1b47889a.js`

### **Problem 2: Build Process**
- **Issue**: Railway may not be building the React app
- **Evidence**: Old file references in HTML
- **Solution**: Added `buildCommand` to `railway.json`

### **Problem 3: File Path Resolution**
- **Issue**: Express static middleware not finding files
- **Evidence**: Server responds but assets don't load
- **Solution**: Added debug logging to server.js

---

## **🔍 DEBUG INFORMATION**

### **Local Build Output**
```bash
npm run build
# Creates: dist/index.html, dist/assets/index-1b47889a.js
```

### **Railway Response**
```bash
curl -I https://campaignpowerup-production.up.railway.app
# Returns: HTTP/2 200 ✅

curl -I https://campaignpowerup-production.up.railway.app/assets/index-1b47889a.js
# Returns: HTTP/2 404 ❌
```

### **Server Logs (Expected)**
```
🔍 Debug Info:
Current directory: /app
Dist directory exists: true
Dist contents: ['index.html', 'assets']
```

---

## **🎯 WHAT WE NEED HELP WITH**

1. **Fix static file serving** - Why are JS files returning 404?
2. **Ensure build process runs** - Is Railway building the React app?
3. **Fix file path resolution** - Are files in the right location?
4. **Alternative deployment** - Should we use Docker or different platform?

---

## **📞 CONTACT INFORMATION**
- **Project**: PowerUp & Win Campaign App
- **Platform**: Railway
- **URL**: https://campaignpowerup-production.up.railway.app
- **Status**: ❌ **CRITICAL - NEEDS IMMEDIATE FIX**

**The app works perfectly locally but fails on Railway. We need help fixing the static file serving and build process.**
