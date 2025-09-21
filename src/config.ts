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
