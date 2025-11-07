# 🚀 Deployment Guide for Cred-AI-ble

This guide will help you deploy your AlgoBharat 2025 project to production.

## 📋 Prerequisites

- GitHub account with your repo: https://github.com/TUMMALA-AKSHAYA/Cred-AI-ble
- Vercel account (for frontend) - https://vercel.com
- Render account (for backend) - https://render.com
- MongoDB Atlas account (for database) - https://www.mongodb.com/cloud/atlas

---

## 🗄️ Step 1: Set Up MongoDB Atlas (Database)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free tier

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select a cloud provider and region (choose closest to you)
   - Name your cluster (e.g., "cred-ai-ble-prod")

3. **Configure Database Access**
   - Go to "Database Access" in left menu
   - Click "Add New Database User"
   - Create username and password (SAVE THESE!)
   - Grant "Read and write to any database" role

4. **Configure Network Access**
   - Go to "Network Access" in left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Get Connection String**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/career-discovery?retryWrites=true&w=majority`

---

## 🖥️ Step 2: Deploy Backend to Render

1. **Sign Up / Log In to Render**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select repository: `TUMMALA-AKSHAYA/Cred-AI-ble`

3. **Configure Web Service**
   ```
   Name: cred-ai-ble-backend
   Region: Choose closest to you
   Branch: claude/debug-session-011CUmHrb4iktFvxE9XQsrQW
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable" and add these:

   ```
   PORT=5001
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/career-discovery?retryWrites=true&w=majority
   JWT_SECRET=cred_ai_ble_jwt_secret_key_change_in_production_2025
   ALGORAND_TREASURY_MNEMONIC=error brown assume flush crawl make net hundred gentle mystery bulb about occur mammal sweet live clean leisure spawn betray remove execute bag able limb
   ```

   ⚠️ **IMPORTANT**: Replace `MONGODB_URI` with YOUR actual MongoDB Atlas connection string!

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL (e.g., `https://cred-ai-ble-backend.onrender.com`)

---

## 🌐 Step 3: Deploy Frontend to Vercel

1. **Sign Up / Log In to Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import `TUMMALA-AKSHAYA/Cred-AI-ble`
   - Select branch: `claude/debug-session-011CUmHrb4iktFvxE9XQsrQW`

3. **Configure Project**
   ```
   Framework Preset: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   ```

4. **Add Environment Variables**
   Before deploying, add these environment variables:

   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   REACT_APP_ALGORAND_NETWORK=testnet
   ```

   ⚠️ **IMPORTANT**: Replace with your actual Render backend URL from Step 2!

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app is live! 🎉

---

## ✅ Step 4: Test Your Deployment

1. **Visit Your Frontend URL**
   - Vercel will provide a URL like: `https://cred-ai-ble.vercel.app`
   - Open it in your browser

2. **Test Wallet Connection**
   - Click "Connect Wallet"
   - Should open Pera Wallet

3. **Test Quiz Flow**
   - Complete the career quiz
   - Take domain assessment
   - Mint NFT badge

4. **Check Backend**
   - Visit `https://your-backend-url.onrender.com/api/health`
   - Should see: `{"status":"ok"}`

---

## 🐛 Troubleshooting

### Backend Issues

**Problem: Backend not starting**
- Check Render logs: Dashboard → Your Service → Logs
- Verify all environment variables are set correctly
- Ensure MongoDB connection string is correct

**Problem: CORS errors**
- Backend `server.js` should have CORS enabled for your frontend domain
- Check the CORS configuration in backend code

### Frontend Issues

**Problem: Cannot connect to backend**
- Verify `REACT_APP_API_URL` environment variable is correct
- Check that backend is running (visit backend URL)
- Redeploy frontend after changing environment variables

**Problem: Wallet not connecting**
- Algorand TestNet requires funding: https://bank.testnet.algorand.network/
- Ensure Pera Wallet is installed
- Check browser console for errors

---

## 📱 Step 5: Update CORS for Production (Backend)

After deploying frontend, you need to update backend CORS settings:

1. Find your `backend/server.js` file
2. Update CORS configuration to include your Vercel URL:

```javascript
const cors = require('cors');
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-app.vercel.app'  // Add your Vercel URL
  ],
  credentials: true
}));
```

3. Commit and push changes to trigger redeployment

---

## 🎯 Final Checklist for AlgoBharat 2025

- [ ] MongoDB Atlas database is created and accessible
- [ ] Backend deployed to Render and running
- [ ] Frontend deployed to Vercel and accessible
- [ ] Wallet connection works (Pera Wallet)
- [ ] Career quiz completes successfully
- [ ] Domain assessment works for all 5 careers
- [ ] NFT badge minting works on Algorand TestNet
- [ ] Badge display page shows minted badges
- [ ] All features working end-to-end

---

## 🔗 Useful Links

- **Frontend URL**: Will be provided by Vercel
- **Backend URL**: Will be provided by Render
- **GitHub Repo**: https://github.com/TUMMALA-AKSHAYA/Cred-AI-ble
- **Algorand TestNet Dispenser**: https://bank.testnet.algorand.network/
- **AlgoExplorer TestNet**: https://testnet.algoexplorer.io/

---

## 💡 Quick Deploy Commands (Alternative)

If you prefer using CLI:

### Deploy Backend to Render (Using Dashboard is easier)
Render doesn't have CLI deployment, use dashboard as described above.

### Deploy Frontend to Vercel (CLI)
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend
cd frontend

# Deploy
vercel --prod

# Add environment variables during deployment
```

---

## 🎉 You're Done!

Your Cred-AI-ble app is now live and ready for AlgoBharat 2025 semifinals!

**Share your deployment URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`

Good luck with the semifinals! 🚀
