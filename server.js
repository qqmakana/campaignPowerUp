const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

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
