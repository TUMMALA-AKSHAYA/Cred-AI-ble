# Cred-AI-ble - Algorand Blockchain Integration

## 🌟 AlgoBharat 2025 Semifinals Submission

A career discovery platform with Web3 credentials powered by Algorand blockchain.

## 🚀 Features

### 1. **Wallet Integration**
- Connect with Pera Wallet (Algorand's leading mobile wallet)
- Real-time balance display
- Persistent wallet connection across sessions
- TestNet integration for safe testing

### 2. **AI-Powered Career Discovery**
- Personality-based career matching quiz
- 5 career paths: AI/ML, Web Dev, Backend, Data Science, UI/UX
- Domain-specific knowledge assessments (8 questions per domain)
- Detailed results with score and percentile ranking

### 3. **Blockchain Credentials** ⛓️
- **NFT Badge Minting**: Mint unique NFT badges for high scores (≥50%)
- **On-Chain Achievements**: Store quiz results permanently on Algorand
- **Verifiable Credentials**: All achievements are publicly verifiable on AlgoExplorer
- **Asset Standards**: Uses Algorand's ASA (Algorand Standard Asset) for NFTs

### 4. **Badge Portfolio**
- View all earned NFT badges in one place
- Direct links to AlgoExplorer for verification
- Display badge metadata (name, asset ID, scores)
- Showcase your Web3 credentials

## 🛠️ Technical Architecture

### Backend (Node.js + Express)
```
backend/
├── services/algorandService.js    # Core Algorand SDK integration
├── routes/algorandRoutes.js       # API endpoints
└── server.js                      # Express server
```

**Key Backend Functions:**
- `createAccount()` - Generate new Algorand accounts
- `getBalance()` - Fetch ALGO balance from TestNet
- `createSkillBadge()` - Mint NFT badges (ASA with supply=1)
- `storeAchievement()` - Store quiz results on-chain
- `getUserBadges()` - Retrieve user's NFT collection
- `getUserAchievements()` - Query on-chain achievements

### Frontend (React + Tailwind CSS)
```
frontend/src/
├── App.js                         # Main quiz application
├── contexts/WalletContext.js      # Wallet state management
├── components/
│   ├── WalletConnect.js           # Wallet connection UI
│   └── BadgeDisplay.js            # NFT badge gallery
└── services/algorandApi.js        # Backend API client
```

**Key Frontend Features:**
- Pera Wallet SDK integration (@perawallet/connect)
- Algorand SDK (algosdk v3.1.2)
- Reactive wallet state with Context API
- Beautiful UI with Lucide icons and Tailwind CSS

## 📦 Dependencies

### Backend
```json
{
  "algosdk": "^3.1.2",
  "express": "^4.18.2",
  "dotenv": "^16.3.1"
}
```

### Frontend
```json
{
  "@perawallet/connect": "^1.3.1",
  "algosdk": "^3.1.2",
  "axios": "^1.6.2",
  "react": "^18.2.0",
  "tailwindcss": "^3.3.6"
}
```

## 🔧 Setup Instructions

### 1. Environment Setup

Create `.env` file in backend:
```bash
ALGORAND_TREASURY_MNEMONIC="your 25-word mnemonic phrase here"
PORT=5001
```

### 2. Backend Setup
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5001
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
# App runs on http://localhost:3000
```

### 4. Get TestNet ALGO
1. Visit https://testnet.algoexplorer.io/dispenser
2. Enter your wallet address
3. Click "Dispense" to get free TestNet ALGO

## 🎯 User Flow

1. **Connect Wallet** → User connects Pera Wallet on TestNet
2. **Take Quiz** → Complete 8-question personality assessment
3. **Get Results** → Receive top 3 career matches with percentages
4. **Domain Assessment** → Take specific domain knowledge test
5. **View Score** → See detailed results with topic breakdown
6. **Mint Badge** → If score ≥50%, mint NFT badge on Algorand
7. **View Portfolio** → Access badge gallery with all achievements

## 🔗 Algorand Blockchain Integration Details

### Network Configuration
```javascript
const algodServer = 'https://testnet-api.algonode.cloud';
const indexerServer = 'https://testnet-idx.algonode.cloud';
```

### NFT Badge Structure
- **Type**: Algorand Standard Asset (ASA)
- **Total Supply**: 1 (true NFT)
- **Decimals**: 0
- **Metadata**: Stored in note field
  - Career path
  - Score
  - Percentile
  - Date earned

### On-Chain Achievement Storage
- **Method**: Zero-amount payment transaction
- **Data**: JSON object in note field
- **Indexer**: Searchable via Algorand Indexer
- **Verifiable**: Public on AlgoExplorer

## 📊 API Endpoints

```
POST   /api/algorand/create-account     - Generate new account
GET    /api/algorand/balance/:address   - Get ALGO balance
POST   /api/algorand/mint-badge         - Mint NFT badge
POST   /api/algorand/store-achievement  - Store quiz result
GET    /api/algorand/badges/:address    - Get user's badges
GET    /api/algorand/achievements/:address - Get achievements
GET    /api/algorand/verify/:txId       - Verify transaction
```

## 🎨 UI Screenshots

### Welcome Screen
- Wallet connection button
- Career discovery intro
- View badges button (when wallet connected)

### Quiz Interface
- Progress bar
- 8 personality questions
- Smooth transitions

### Results Page
- Top 3 career matches
- Skill requirements
- Assessment buttons

### Domain Assessment
- 8 technical questions
- Difficulty indicators
- Topic tags

### Badge Minting
- Automatic if score ≥50%
- Connect wallet prompt if not connected
- Minting progress indicator
- Success confirmation with Asset ID

### Badge Gallery
- Grid layout of earned badges
- Asset IDs and names
- Links to AlgoExplorer
- Empty state for new users

## 🏆 Why Algorand?

1. **Fast**: ~4.5 second finality
2. **Low Cost**: Minimal transaction fees (~0.001 ALGO)
3. **Green**: Carbon-negative blockchain
4. **Simple**: Native ASA for NFTs (no smart contracts needed)
5. **Scalable**: 1,000+ TPS capability

## 🌐 Use Case: Verifiable Education Credentials

**Problem**: Traditional certificates are:
- Easy to forge
- Hard to verify
- Centrally controlled
- Not portable

**Solution**: Blockchain-based credentials are:
- Immutable and tamper-proof
- Instantly verifiable on AlgoExplorer
- User-owned and portable
- Decentralized and trustless

**Real-World Applications**:
- Job applications with verifiable skills
- Educational institutions issuing certificates
- Professional certifications
- Continuing education tracking
- Skill-based hiring platforms

## 🔒 Security Features

- Wallet private keys never touch our servers
- All minting done client-side with user approval
- TestNet environment for safe testing
- Treasury account for badge minting (backend-controlled)
- User accounts remain sovereign

## 🚀 Future Enhancements

- [ ] Multi-wallet support (Defly, MyAlgo)
- [ ] MainNet deployment
- [ ] IPFS integration for badge images
- [ ] Smart contract for automated badging
- [ ] Leaderboards and rankings
- [ ] Social sharing features
- [ ] Achievement unlocking system
- [ ] Transferable vs non-transferable badges

## 📝 License

MIT License - Open source for educational purposes

## 👥 Team

Built for AlgoBharat 2025 Semifinals

## 📞 Contact

For questions about this implementation, refer to the codebase or AlgoBharat documentation.

---

**🎉 Ready for Submission!** This project demonstrates practical Algorand integration for real-world education credentials use case.
