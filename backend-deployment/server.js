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
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

// Initialize data file if it doesn't exist
const initializeDataFile = async () => {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([]));
  }
};

// API Routes

// Submit form data
app.post('/api/submit', async (req, res) => {
  try {
    const submissionData = {
      ...req.body,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      ip: req.ip || req.connection.remoteAddress
    };

    // Read existing data
    const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
    
    // Add new submission
    data.push(submissionData);
    
    // Save to file
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    
    console.log('New submission received:', submissionData.id);
    
    res.json({
      success: true,
      message: 'Submission received successfully',
      id: submissionData.id
    });
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save submission'
    });
  }
});

// Get all submissions (admin)
app.get('/api/submissions', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
    res.json({
      success: true,
      submissions: data,
      count: data.length
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch submissions'
    });
  }
});

// Get submission by ID
app.get('/api/submissions/:id', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
    const submission = data.find(s => s.id === req.params.id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    res.json({
      success: true,
      submission
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch submission'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'PowerUp & Win API is running',
    timestamp: new Date().toISOString()
  });
});

// Initialize server
const startServer = async () => {
  await ensureDataDir();
  await initializeDataFile();
  
  app.listen(PORT, () => {
    console.log(`🚀 PowerUp & Win API running on port ${PORT}`);
    console.log(`📊 Data stored in: ${DATA_FILE}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  });
};

startServer().catch(console.error);
