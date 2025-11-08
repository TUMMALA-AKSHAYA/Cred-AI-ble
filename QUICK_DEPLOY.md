# ⚡ Quick Deploy Guide (5 Minutes)

## 🎯 Goal
Get Cred-AI-ble live for AlgoBharat 2025 semifinals in under 5 minutes!

---

## 📦 Step 1: Deploy Backend (2 minutes)

### Option A: Railway (Recommended - Easiest)
1. Visit: https://railway.app/
2. Sign in with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select `Cred-AI-ble` repo
5. Railway auto-detects Node.js
6. Set **Root Directory**: `backend`
7. Click **"Deploy"**
8. Add environment variables in Railway:
   ```
   ALGORAND_TREASURY_MNEMONIC=error brown assume flush crawl make net hundred gentle mystery bulb about occur mammal sweet live clean leisure spawn betray remove execute bag able limb
   MONGODB_URI=mongodb://localhost:27017/career-discovery
   ```
9. Copy your Railway URL: `https://xxx.railway.app`

### Option B: Render
1. Visit: https://render.com/
2. New → Web Service
3. Connect GitHub repo
4. Root Directory: `backend`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add environment variables
8. Deploy

---

## 🎨 Step 2: Deploy Frontend (2 minutes)

### Vercel (Recommended)
1. Visit: https://vercel.com/
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Import `Cred-AI-ble` repo
5. Framework: **Vite**
6. Root Directory: `frontend`
7. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-railway-url.railway.app/api
   ```
   ⚠️ Replace with your actual Railway URL!
8. Click **"Deploy"**
9. Your app is live! 🎉

---

## ✅ Step 3: Test (1 minute)

1. Visit your Vercel URL
2. Click "Connect Wallet" → Connect Pera Wallet
3. Complete quiz
4. Click "Mint NFT Badge"
5. Check Algoexplorer link!

---

## 🚨 Troubleshooting

**Backend won't start?**
- Check Railway logs
- Verify environment variables are set
- Port should be set by Railway automatically

**Frontend can't connect to backend?**
- Double-check `REACT_APP_API_URL` in Vercel
- Make sure it ends with `/api`
- Check CORS settings in backend

**NFT minting fails?**
- Verify `ALGORAND_TREASURY_MNEMONIC` is set in Railway
- Check treasury wallet has TestNet ALGO
- View: https://testnet.algoexplorer.io/address/PBOQ6GQA3BXVTXZPC52DYUAGTSX5WKCFWL7JCEJPUH3OIB6ACWDWDGC44M

---

## 🎉 Done!

Your app is now live at:
- **Frontend**: `https://cred-ai-ble.vercel.app`
- **Backend**: `https://your-app.railway.app`

**Share these URLs with AlgoBharat judges!** 🏆

---

## 📝 What the Judges Will See

1. ✅ AI-powered career matching
2. ✅ Blockchain NFT credentials on Algorand
3. ✅ Premium UI with dark mode
4. ✅ Pera Wallet integration
5. ✅ Personalized 12-month roadmap
6. ✅ Real TestNet transactions

Good luck! 🚀
