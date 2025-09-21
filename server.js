const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Debug logging
console.log('🔍 Railway Debug Info:');
console.log('Current directory:', __dirname);
console.log('Dist directory exists:', fs.existsSync(path.join(__dirname, 'dist')));
if (fs.existsSync(path.join(__dirname, 'dist'))) {
  console.log('Dist contents:', fs.readdirSync(path.join(__dirname, 'dist')));
  if (fs.existsSync(path.join(__dirname, 'dist', 'assets'))) {
    console.log('Assets contents:', fs.readdirSync(path.join(__dirname, 'dist', 'assets')));
  }
} else {
  console.log('❌ DIST DIRECTORY NOT FOUND - BUILD FAILED');
}

// Enable CORS
app.use(cors());

// Health check endpoint for Railway
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'PowerUp & Win app is running'
  });
});

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
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
