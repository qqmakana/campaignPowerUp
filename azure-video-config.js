// Azure Video Configuration for PowerUp & Win App
// This file handles video source management for Azure deployment

class AzureVideoManager {
  constructor() {
    this.videoSources = [
      // Primary: Azure Blob Storage (will be set dynamically)
      process.env.VIDEO_URL || "/assets/V8.mp4",
      
      // Fallback: Local assets
      "/assets/V8.mp4",
      
      // External fallbacks
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    ];
    
    this.currentSourceIndex = 0;
    this.maxRetries = 3;
    this.retryCount = 0;
  }

  // Get the current video source
  getCurrentSource() {
    return this.videoSources[this.currentSourceIndex];
  }

  // Get all video sources for HTML5 video element
  getAllSources() {
    return this.videoSources.map((src, index) => ({
      src,
      type: "video/mp4",
      priority: index === 0 ? "high" : "low"
    }));
  }

  // Try next video source on error
  tryNextSource() {
    if (this.currentSourceIndex < this.videoSources.length - 1) {
      this.currentSourceIndex++;
      this.retryCount = 0;
      return this.getCurrentSource();
    }
    return null;
  }

  // Check if video source is accessible
  async checkVideoAccessibility(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.warn(`Video source ${url} not accessible:`, error);
      return false;
    }
  }

  // Preload video sources in order of priority
  async preloadVideos() {
    console.log("🎬 Preloading video sources...");
    
    for (let i = 0; i < this.videoSources.length; i++) {
      const source = this.videoSources[i];
      const isAccessible = await this.checkVideoAccessibility(source);
      
      if (isAccessible) {
        console.log(`✅ Video source ${i + 1} is accessible: ${source}`);
        this.currentSourceIndex = i;
        return source;
      } else {
        console.log(`❌ Video source ${i + 1} not accessible: ${source}`);
      }
    }
    
    console.warn("⚠️ No video sources are accessible");
    return null;
  }

  // Get video configuration for React component
  getVideoConfig() {
    return {
      sources: this.videoSources,
      currentSource: this.getCurrentSource(),
      allSources: this.getAllSources(),
      hasFallbacks: this.videoSources.length > 1
    };
  }
}

// Export for use in React components
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AzureVideoManager;
} else if (typeof window !== 'undefined') {
  window.AzureVideoManager = AzureVideoManager;
}

// Auto-initialize for browser
if (typeof window !== 'undefined') {
  window.azureVideoManager = new AzureVideoManager();
  
  // Preload videos when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    window.azureVideoManager.preloadVideos();
  });
}
