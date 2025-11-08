# 🚀 Deployment Guide - Cred-AI-ble (AlgoBharat 2025)

## 📋 Prerequisites
- GitHub account
- Vercel account (free): https://vercel.com/signup
- Railway account (free): https://railway.app/
- Your Algorand treasury wallet mnemonic (already in backend/.env)

---

## 🔧 Part 1: Deploy Backend to Railway

### Step 1: Push Code to GitHub
```bash
# Make sure you're on the correct branch
git checkout claude/main-updates-011CUmHrb4iktFvxE9XQsrQW

# Push if not already pushed
git push -u origin claude/main-updates-011CUmHrb4iktFvxE9XQsrQW
```

### Step 2: Deploy on Railway
1. Go to https://railway.app/ and sign in with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your `Cred-AI-ble` repository
4. Select branch: `claude/main-updates-011CUmHrb4iktFvxE9XQsrQW`
5. Railway will detect your backend automatically

### Step 3: Configure Root Directory
1. In Railway project settings, click **Settings**
2. Set **Root Directory** to: `backend`
3. Set **Start Command** to: `npm start`

### Step 4: Add Environment Variables
Click **Variables** tab and add:

```
PORT=5001
NODE_ENV=production
MONGODB_URI=mongodb+srv://your-mongodb-atlas-uri
JWT_SECRET=cred_ai_ble_jwt_secret_key_change_in_production_2025
ALGORAND_TREASURY_MNEMONIC=error brown assume flush crawl make net hundred gentle mystery bulb about occur mammal sweet live clean leisure spawn betray remove execute bag able limb
```

**Important**:
- For MongoDB, create a free cluster at https://www.mongodb.com/cloud/atlas/register
- Copy your connection string and replace `MONGODB_URI`
- OR keep it as `mongodb://localhost:27017/career-discovery` (Railway will auto-provision)

### Step 5: Deploy
1. Click **Deploy**
2. Wait for build to complete (~2-3 minutes)
3. Once deployed, Railway will give you a URL like: `https://your-app.railway.app`
4. **Copy this URL** - you'll need it for frontend!

### Step 6: Test Backend
Visit: `https://your-app.railway.app/api/health`

You should see:
```json
{
  "status": "OK",
  "message": "Career Discovery API is running",
  "timestamp": "2025-11-08T..."
}
```

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Deploy on Vercel
1. Go to https://vercel.com/ and sign in with GitHub
2. Click **"Add New..." → "Project"**
3. Import your `Cred-AI-ble` repository
4. Select branch: `claude/main-updates-011CUmHrb4iktFvxE9XQsrQW`

### Step 2: Configure Build Settings
Vercel should auto-detect Vite, but verify:

- **Framework Preset**: `Vite`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 3: Add Environment Variables
Click **Environment Variables** and add:

```
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

**Replace** `your-backend-url.railway.app` with your actual Railway URL from Part 1!

### Step 4: Deploy
1. Click **Deploy**
2. Wait for build (~2-3 minutes)
3. Vercel will give you a live URL: `https://cred-ai-ble.vercel.app`

---

## ✅ Part 3: Test NFT Minting on Production

### 1. Visit Your Live App
Go to: `https://cred-ai-ble.vercel.app` (or your custom Vercel URL)

### 2. Connect Pera Wallet
- Click **"🔗 Connect Wallet"** in top-right navbar
- Pera Wallet modal opens
- Connect your Algorand wallet
- You should see your address and ALGO balance

### 3. Complete Quiz Flow
- Click **"Start Career Diagnosis"**
- Answer 8 career discovery questions
- Get matched with a career
- Answer 8 domain-specific questions
- View results on Dashboard

### 4. Mint NFT Credential
- On Dashboard, click **"⛓️ Mint NFT Badge"**
- Wait 5-10 seconds for blockchain transaction
- Alert appears with:
  - ✅ Asset ID
  - ✅ Transaction ID
  - ✅ Algoexplorer link

### 5. Verify On Blockchain
- Click the Algoexplorer link from the alert
- You'll see your NFT on Algorand TestNet!
- Your NFT also appears in "Your Blockchain Credentials" section

### 6. Check All Features
- ✅ Dark mode toggle works
- ✅ Wallet shows balance
- ✅ NFT displays with Asset ID
- ✅ Roadmap page shows personalized learning path
- ✅ All text readable in light/dark modes

---

## 🎯 Part 4: Final Checks for AlgoBharat 2025

### Demo URL
Your live app: `https://cred-ai-ble.vercel.app`

### Key Features to Show Judges
1. **AI Career Matching** - 8 psychometric questions
2. **Blockchain NFT Credentials** - Minted on Algorand TestNet
3. **Personalized Roadmap** - 12-month learning path
4. **Dark Mode** - Premium billion-dollar SaaS aesthetic
5. **Wallet Integration** - Pera Wallet with balance display

### Troubleshooting

**Issue: Backend not responding**
- Check Railway logs: Project → Deployments → Logs
- Verify MongoDB connection string
- Ensure all environment variables are set

**Issue: Frontend can't reach backend**
- Check CORS settings in backend
- Verify `REACT_APP_API_URL` in Vercel
- Check Railway URL is correct (with `/api`)

**Issue: NFT minting fails**
- Check backend has `ALGORAND_TREASURY_MNEMONIC` set
- Verify treasury wallet has TestNet ALGO balance
- Check Railway logs for errors

**Issue: Wallet won't connect**
- Install Pera Wallet: https://perawallet.app/
- Make sure you're on TestNet
- Try mobile app if desktop fails

---

## 📊 MongoDB Atlas Setup (Optional)

If you want a production database instead of local:

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free cluster (M0)
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow all for Railway)
5. Get connection string
6. Add to Railway environment variables

---

## 🎉 Deployment Complete!

Your app is now live with:
- ✅ Frontend on Vercel
- ✅ Backend on Railway
- ✅ Algorand NFT minting working
- ✅ Production-ready for AlgoBharat 2025!

**Live URLs:**
- Frontend: `https://cred-ai-ble.vercel.app`
- Backend: `https://your-app.railway.app`
- Health Check: `https://your-app.railway.app/api/health`

---

## 📝 Submission Checklist

For AlgoBharat 2025 Semifinals:

- [ ] Live demo URL working
- [ ] GitHub repo public/accessible
- [ ] NFT minting tested on TestNet
- [ ] Demo video recorded (2-3 mins)
- [ ] README updated with setup instructions
- [ ] Screenshots of wallet integration
- [ ] Algoexplorer transaction links ready

**Deadline**: November 15, 2025

Good luck! 🚀
