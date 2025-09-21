# PowerUp & Win - Professional Backend API

## 🚀 **Professional Data Storage Solution**

### **What This Provides:**
- ✅ **Secure API** for form submissions
- ✅ **JSON file storage** (easy to manage)
- ✅ **Admin endpoints** for data access
- ✅ **IP tracking** for security
- ✅ **Timestamp logging** for audit trail
- ✅ **Error handling** and validation

### **Data Storage Location:**
```
backend/
├── server.js          # Main API server
├── package.json       # Dependencies
├── data/              # Data storage directory
│   └── submissions.json  # All form submissions
└── README.md          # This file
```

## 🔧 **Setup Instructions:**

### **1. Install Dependencies:**
```bash
cd backend
npm install
```

### **2. Start the Server:**
```bash
npm start
```

### **3. Test the API:**
- **Health Check:** http://localhost:3001/api/health
- **Submit Form:** POST http://localhost:3001/api/submit
- **View Data:** GET http://localhost:3001/api/submissions

## 📊 **API Endpoints:**

### **Submit Form Data:**
```javascript
POST /api/submit
Content-Type: application/json

{
  "storeName": "Store Name",
  "representativeName": "John Doe",
  "email": "john@store.com",
  "phone": "+27123456789",
  "address": "123 Main St",
  "storeType": "retail",
  "agreeToTerms": true,
  "agreeToBranding": true
}
```

### **Get All Submissions (Admin):**
```javascript
GET /api/submissions
```

### **Get Specific Submission:**
```javascript
GET /api/submissions/{id}
```

## 🛡️ **Security Features:**

- **CORS enabled** for cross-origin requests
- **IP address tracking** for each submission
- **Timestamp logging** for audit trail
- **Error handling** prevents data loss
- **JSON validation** ensures data integrity

## 📈 **Production Deployment:**

### **Option 1: VPS/Server:**
- Upload backend folder to your server
- Install Node.js
- Run `npm install && npm start`
- Configure reverse proxy (nginx)

### **Option 2: Cloud Services:**
- **Heroku:** Easy deployment
- **Railway:** Simple setup
- **DigitalOcean:** Full control
- **AWS:** Enterprise grade

## 🔄 **Data Management:**

### **View Submissions:**
```bash
# View all submissions
curl http://localhost:3001/api/submissions

# View specific submission
curl http://localhost:3001/api/submissions/1234567890
```

### **Backup Data:**
```bash
# Copy the data file
cp backend/data/submissions.json backup-$(date +%Y%m%d).json
```

## 📱 **Integration with Frontend:**

The frontend will automatically use this API when deployed. No changes needed to your React app!

---

**Professional, secure, and scalable data storage!** 🎉


