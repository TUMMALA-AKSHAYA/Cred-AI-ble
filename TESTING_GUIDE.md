# Quick Testing Guide

## ⚡ Fast Setup for Testing (5 minutes)

### Prerequisites Checklist
- [ ] Node.js installed
- [ ] Pera Wallet app on phone OR Pera Web Wallet extension
- [ ] Backend and Frontend packages installed
- [ ] TestNet ALGO in your wallet

---

## 🚀 Step-by-Step Testing

### Step 1: Start Backend (Terminal 1)
```bash
cd backend
npm install  # if not done yet
npm start
```
✅ Should see: `🚀 Server running on port 5001`

### Step 2: Start Frontend (Terminal 2)
```bash
cd frontend
npm install  # if not done yet
npm start
```
✅ Should open: `http://localhost:3000`

### Step 3: Get TestNet ALGO
1. Open Pera Wallet
2. Switch to TestNet (Settings → Developer Settings → Node Settings → TestNet)
3. Copy your wallet address
4. Visit: https://testnet.algoexplorer.io/dispenser
5. Paste address and click "Dispense"
6. Wait ~5 seconds for confirmation

✅ You should have 10 ALGO in your wallet

### Step 4: Connect Wallet
1. Click "Connect Wallet" button on the homepage
2. Scan QR code with Pera Wallet app OR approve in browser extension
3. Approve connection in Pera Wallet

✅ Should see your address and balance displayed

### Step 5: Take Career Quiz
1. Click "Begin Your Journey"
2. Answer 8 questions (any answers work)
3. View your top 3 career matches

✅ Should see results with percentages

### Step 6: Take Domain Assessment
1. Click "Take [Career] Assessment" on any result
2. Answer 8 technical questions
3. View your score and percentile

✅ Should see detailed results with topic breakdown

### Step 7: Mint NFT Badge (if score ≥ 50%)
1. If score is 50% or higher, you'll see "Claim Your NFT Badge" section
2. Click "Mint NFT Badge" button
3. Approve transaction in Pera Wallet (~0.001 ALGO fee)
4. Wait for confirmation (~5 seconds)

✅ Should see "Badge Minted Successfully!" with Asset ID

### Step 8: View Your Badges
1. Click "View My Badges" button
2. See your earned NFT badge
3. Click "View on AlgoExplorer" to verify on blockchain

✅ Should see badge gallery with your NFT

---

## 🧪 Test Scenarios

### Test 1: Low Score (No Badge)
- Take quiz and intentionally get < 50%
- Should NOT show mint badge option
- Should still store achievement on blockchain

### Test 2: High Score (Badge Eligible)
- Take quiz and get ≥ 50%
- Should show mint badge option
- Click mint and approve in wallet
- Check badge in gallery

### Test 3: Multiple Badges
- Take assessments for different careers
- Mint badge for each (if eligible)
- View all badges in gallery

### Test 4: Wallet Disconnect/Reconnect
- Disconnect wallet
- Refresh page
- Connect wallet again
- Badges should still be there (they're on blockchain!)

---

## 🔍 Verification Steps

### Verify Backend is Working
```bash
# Test balance endpoint
curl http://localhost:5001/api/algorand/balance/XSYPMWXX5L5E5PNEIFPV65EEDZCEQPP5GSV2FJPFWCXN5V53I2G7HW6YWY
```
✅ Should return JSON with success: true

### Verify on AlgoExplorer
1. Copy your wallet address
2. Visit: https://testnet.algoexplorer.io/address/[YOUR_ADDRESS]
3. Check:
   - Asset tab for NFT badges
   - Transactions tab for achievements

### Verify NFT Badge
1. Get Asset ID from mint success message
2. Visit: https://testnet.algoexplorer.io/asset/[ASSET_ID]
3. Check:
   - Total supply = 1
   - Decimals = 0
   - Unit name = BADGE
   - Your address as holder

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to server"
**Solution:**
- Check backend is running on port 5001
- Check no other app is using port 5001
- Restart backend server

### Issue: "Failed to connect to wallet"
**Solution:**
- Make sure Pera Wallet is installed
- Make sure you're on TestNet (not MainNet)
- Try disconnecting and reconnecting

### Issue: "Insufficient funds" when minting
**Solution:**
- Check you have at least 0.1 ALGO in wallet
- Visit dispenser to get more TestNet ALGO
- Transaction fee is only ~0.001 ALGO but you need minimum balance

### Issue: "BigInt mixing error"
**Solution:**
- This should be fixed in the latest code
- Make sure you have latest changes
- Restart backend server

### Issue: Badges not showing
**Solution:**
- Wait 5-10 seconds after minting (blockchain confirmation)
- Refresh the page
- Check your wallet address on AlgoExplorer

---

## 📊 Expected Results

### After completing one full flow:

1. **Wallet Connected** ✅
   - Address displayed in header
   - Balance showing

2. **Achievement Stored** ✅
   - Transaction visible on AlgoExplorer
   - Note field contains quiz data

3. **Badge Minted** (if eligible) ✅
   - NFT in your wallet
   - Visible in badge gallery
   - Verifiable on AlgoExplorer

4. **Everything On-Chain** ✅
   - Immutable
   - Verifiable
   - Owned by you

---

## 🎥 Demo Script (for presentation)

```
1. Show welcome screen
   "This is Cred-AI-ble, a career discovery platform with blockchain credentials"

2. Connect wallet
   "I'll connect my Algorand wallet using Pera Wallet"

3. Take quiz
   "Let's take the career discovery quiz - 8 quick questions"

4. Show results
   "Based on my answers, these are my top career matches"

5. Take assessment
   "Now I'll take the AI/Machine Learning assessment"

6. Show score
   "I scored 75%! Now I can mint an NFT badge"

7. Mint badge
   "This mints a unique NFT on Algorand blockchain"

8. Show verification
   "Here's my badge on AlgoExplorer - publicly verifiable"

9. Show badge gallery
   "All my earned badges in one place"
```

---

## ⏱️ Time Estimates

- Setup: 5 minutes
- One complete quiz flow: 3 minutes
- Minting badge: 30 seconds
- Verification: 1 minute

**Total demo time: ~10 minutes**

---

## 📸 Screenshots to Take

For your submission, capture:
1. Welcome screen with wallet connected
2. Quiz in progress
3. Career results
4. Domain assessment
5. High score results
6. Mint badge button
7. Minting in progress
8. Success message with Asset ID
9. Badge gallery
10. AlgoExplorer verification

---

## ✅ Pre-Submission Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Wallet connects successfully
- [ ] Quiz completes and shows results
- [ ] Domain assessment works
- [ ] Badge minting works (with wallet approval)
- [ ] Badges display in gallery
- [ ] AlgoExplorer shows transactions
- [ ] AlgoExplorer shows NFT badges
- [ ] Code is pushed to GitHub
- [ ] Documentation is complete

---

## 🎯 Key Points for Submission

1. **Real blockchain integration** - Not a mock/demo
2. **TestNet deployment** - Fully functional
3. **Verifiable credentials** - Anyone can verify on AlgoExplorer
4. **User-owned assets** - NFTs belong to users
5. **Practical use case** - Solves real problem in education

---

**Good luck with your submission! 🚀**
