# 🚀 CredAIble - Setup & Deployment Guide

## AlgoBharat 2025 Hack Series - Semifinals Ready

---

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Installation Steps](#installation-steps)
4. [Environment Configuration](#environment-configuration)
5. [Running Locally](#running-locally)
6. [Deployment Options](#deployment-options)
7. [Troubleshooting](#troubleshooting)

---

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/TUMMALA-AKSHAYA/Cred-AI-ble.git
cd Cred-AI-ble

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Setup environment (files already created)
# backend/.env and frontend/.env are configured

# Start backend (Terminal 1)
cd backend && npm start

# Start frontend (Terminal 2)
cd frontend && npm start
```

---

## 📦 Prerequisites

### Required Software
- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **Git**: Latest version
- **MongoDB** (Optional for MVP demo): v4.0 or higher

### Algorand TestNet Requirements
- ✅ Treasury Account Generated: `XSYPMWXX5L5E5PNEIFPV65EEDZCEQPP5GSV2FJPFWCXN5V53I2G7HW6YWY`
- 💰 **Action Required**: Fund the treasury account at [Algorand TestNet Dispenser](https://bank.testnet.algorand.network/)
- Recommended: 10 ALGO for testing all features

---

## 🔧 Installation Steps

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Verify algosdk installation
npm list algosdk
# Should show: algosdk@3.1.2

# Test Algorand integration
node scripts/testAlgorandIntegration.js
```

**Expected Dependencies:**
- express ^4.18.2
- cors ^2.8.5
- dotenv ^16.4.5
- algosdk ^3.1.2
- mongoose ^8.0.0
- bcryptjs ^2.4.3
- jsonwebtoken ^9.0.2

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Verify critical packages
npm list react algosdk @perawallet/connect
```

**Expected Dependencies:**
- react ^18.2.0
- react-dom ^18.2.0
- algosdk ^3.1.2
- @perawallet/connect ^1.3.1
- axios ^1.6.2
- tailwindcss ^3.3.6

---

## 🔐 Environment Configuration

### Backend (.env)
The `.env` file has been created with the following configuration:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# MongoDB (optional for demo)
MONGODB_URI=mongodb://localhost:27017/career-discovery

# JWT
JWT_SECRET=cred_ai_ble_jwt_secret_key_change_in_production_2025

# Algorand Configuration
ALGORAND_TREASURY_MNEMONIC="error brown assume flush crawl make net hundred gentle mystery bulb about occur mammal sweet live clean leisure spawn betray remove execute bag able limb"
```

**⚠️ IMPORTANT**:
- Keep the mnemonic secure
- Never commit .env to version control
- Change JWT_SECRET before production deployment

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5001/api
REACT_APP_ALGORAND_NETWORK=testnet
```

---

## 🏃 Running Locally

### Option 1: Separate Terminals

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Server runs on: http://localhost:5001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# App opens on: http://localhost:3000
```

### Option 2: Production Build

```bash
# Build frontend
cd frontend
npm run build

# Serve static files from backend
cd ../backend
# Add static file serving in server.js
npm start
```

---

## 🌐 Deployment Options

### 1. Vercel (Frontend) + Render (Backend) - Recommended

#### Deploy Backend to Render
1. Push code to GitHub
2. Connect Render to your repository
3. Add environment variables in Render dashboard
4. Deploy with Node.js environment

**Render Configuration:**
```yaml
Build Command: npm install
Start Command: npm start
Environment: Node
Region: Singapore (closest to India)
```

#### Deploy Frontend to Vercel
1. Connect Vercel to GitHub repository
2. Set build settings:
   ```
   Framework: Create React App
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```
3. Add environment variables:
   ```
   REACT_APP_API_URL=https://your-backend.onrender.com/api
   REACT_APP_ALGORAND_NETWORK=testnet
   ```

### 2. Railway (Full Stack)

```bash
# Install Railway CLI
npm install -g railway

# Login
railway login

# Deploy backend
cd backend
railway init
railway up

# Deploy frontend
cd ../frontend
railway init
railway up
```

### 3. Heroku (Alternative)

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Deploy backend
cd backend
heroku create credaible-backend
heroku config:set $(cat .env | xargs)
git push heroku main

# Deploy frontend
cd ../frontend
heroku create credaible-frontend
heroku config:set REACT_APP_API_URL=https://credaible-backend.herokuapp.com/api
git push heroku main
```

### 4. AWS / Google Cloud / Azure

For cloud deployment:
1. Use EC2/Compute Engine/App Service for backend
2. Use S3/Cloud Storage/Blob Storage + CloudFront/CDN for frontend
3. Configure environment variables in cloud console
4. Setup CI/CD with GitHub Actions

---

## 🔍 Treasury Account Funding

**CRITICAL BEFORE DEMO:**

1. Go to: https://bank.testnet.algorand.network/
2. Paste treasury address: `XSYPMWXX5L5E5PNEIFPV65EEDZCEQPP5GSV2FJPFWCXN5V53I2G7HW6YWY`
3. Request 10 ALGO
4. Verify on AlgoExplorer: https://testnet.algoexplorer.io/address/XSYPMWXX5L5E5PNEIFPV65EEDZCEQPP5GSV2FJPFWCXN5V53I2G7HW6YWY

**Test Blockchain Integration:**
```bash
cd backend
node scripts/testAlgorandIntegration.js
```

---

## 🐛 Troubleshooting

### Issue: Port Already in Use
```bash
# Kill process on port 5001
lsof -ti:5001 | xargs kill -9

# Or change port in backend/.env
PORT=5002
```

### Issue: MongoDB Connection Error
**Solution:** MongoDB is optional for the MVP demo. The Algorand features work independently.

To run MongoDB:
```bash
# Install MongoDB (macOS)
brew install mongodb-community

# Install MongoDB (Ubuntu)
sudo apt install mongodb

# Start MongoDB
mongod --dbpath /path/to/data
```

### Issue: Algorand API Errors
**Common causes:**
1. Treasury account not funded → Fund at TestNet dispenser
2. Network connectivity → Check internet connection
3. Rate limiting → Wait a few seconds between requests

### Issue: Frontend Won't Build
**Solutions:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Fix vulnerabilities (optional)
npm audit fix

# Force resolve peer dependencies
npm install --legacy-peer-deps
```

### Issue: React Router Not Working on Refresh
Add to backend/server.js (for production):
```javascript
// Serve React app
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
```

---

## 📊 API Testing

### Health Check
```bash
curl http://localhost:5001/api/health
```

### Create Algorand Account
```bash
curl -X POST http://localhost:5001/api/algorand/create-account
```

### Check Balance
```bash
curl http://localhost:5001/api/algorand/balance/YOUR_ADDRESS
```

### Mint Badge
```bash
curl -X POST http://localhost:5001/api/algorand/mint-badge \
  -H "Content-Type: application/json" \
  -d '{
    "recipientAddress": "USER_ADDRESS",
    "careerPath": "AI/Machine Learning",
    "score": 85,
    "percentile": 90
  }'
```

---

## 📝 Demo Checklist for AlgoBharat 2025

- [ ] Backend running without errors
- [ ] Frontend accessible and responsive
- [ ] Treasury account funded (10 ALGO minimum)
- [ ] Can create Algorand accounts
- [ ] Can complete career quiz
- [ ] Can take domain assessment
- [ ] Blockchain integration working (test one NFT mint)
- [ ] Wallet connect working (Pera Wallet)
- [ ] Clean, professional UI/UX
- [ ] README updated with live demo links
- [ ] GitHub repository public and organized
- [ ] Deployment on live URL (Vercel/Render)

---

## 🎯 Next Steps for Semifinals

1. **Fund Treasury Account** (Top Priority)
2. **Deploy to Production** (Vercel + Render recommended)
3. **Test End-to-End Flow** with real Pera Wallet
4. **Prepare Demo Script** (2-3 minute walkthrough)
5. **Create Demo Video** (Submit by Nov 28)
6. **Prepare PPT** (10 slides max)
7. **Polish UI/UX** (Focus on quiz experience)

---

## 🏆 AlgoBharat Timeline

- ✅ **Nov 5-15**: Use Case Development & Office Hours
- 🎯 **Nov 15**: Use Case Submission Deadline
- 📅 **Nov 17**: Semifinalists Announced
- 📽️ **Nov 28**: Final Demo Video & PPT Submission
- 🏅 **Dec 5**: Semifinal Round (Bangalore, in-person)
- 🎉 **Dec 6-7**: Grand Finale @ Algorand India Summit

---

## 🤝 Support

For issues during hackathon:
- Attend mandatory webinar: Nov 6, 2025, 8:00 PM IST
- Office Hours: Nov 5-15
- GitHub Issues: https://github.com/TUMMALA-AKSHAYA/Cred-AI-ble/issues

---

**Built with ❤️ for AlgoBharat 2025 Hack Series**

*Empowering careers with AI & Algorand blockchain* 🚀
