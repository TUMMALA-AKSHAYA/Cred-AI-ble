# Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm or yarn
- Git

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Algorand treasury mnemonic
npm start
```

Server runs on: http://localhost:5001

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

App runs on: http://localhost:3000

## 🔧 Algorand Integration

### Generate Treasury Account
```bash
cd backend
node scripts/generateTreasuryAccount.js
```

Copy the generated mnemonic to `.env`:
```
ALGORAND_TREASURY_MNEMONIC="your 25 words here"
```

### Fund Treasury Account

1. Visit: https://bank.testnet.algorand.network/
2. Paste your treasury address
3. Click "Dispense" to get 10 test ALGO

### Test Algorand Connection
```bash
# Check balance
curl http://localhost:5001/api/algorand/balance/YOUR_ADDRESS

# Create account
curl -X POST http://localhost:5001/api/algorand/create-account

# Mint badge
curl -X POST http://localhost:5001/api/algorand/mint-badge \
  -H "Content-Type: application/json" \
  -d '{
    "recipientAddress": "YOUR_ADDRESS",
    "careerPath": "Web Development",
    "score": 85,
    "percentile": 82
  }'
```

## 📁 Project Structure
```
career-discovery-platform/
├── backend/
│   ├── services/
│   │   └── algorandService.js    # Core Algorand SDK integration
│   ├── routes/
│   │   └── algorandRoutes.js     # Blockchain API endpoints
│   ├── utils/
│   │   └── algorandHelpers.js    # Utility functions
│   ├── scripts/
│   │   └── generateTreasuryAccount.js
│   ├── server.js
│   ├── package.json              # Includes algosdk ^3.1.2
│   └── .env
└── frontend/
    ├── src/
    │   ├── services/
    │   │   └── algorandApi.js    # API client
    │   ├── App.js                # Main component
    │   └── index.js
    ├── package.json              # Includes algosdk, @perawallet/connect
    └── tailwind.config.js
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Manual Testing Checklist

- [ ] Backend server starts successfully
- [ ] Treasury account has balance > 0
- [ ] Can create new accounts
- [ ] Can check balances
- [ ] Can mint NFT badges
- [ ] Transactions appear on AlgoExplorer
- [ ] Frontend connects to backend
- [ ] Wallet connection works (if implemented)

## 🔍 Debugging

### Common Issues

**Port already in use:**
```bash
lsof -ti:5001 | xargs kill -9
```

**MongoDB connection error:**
Comment out MongoDB lines in `server.js` if not using

**Algorand transaction fails:**
- Check treasury has sufficient balance
- Verify mnemonic in .env is correct
- Ensure TestNet is accessible

### Logs

Backend logs: Check terminal output
Algorand transactions: https://testnet.algoexplorer.io/

## 📚 Resources

- [Algorand Developer Docs](https://developer.algorand.org/)
- [algosdk Documentation](https://algorand.github.io/js-algorand-sdk/)
- [Pera Wallet Connect](https://github.com/perawallet/connect)
- [AlgoExplorer TestNet](https://testnet.algoexplorer.io/)

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Commit with clear message
5. Push and create PR

## 📝 Commit Guidelines

Good commit messages:
- `Add Pera Wallet integration with algosdk`
- `Implement NFT badge minting on Algorand TestNet`
- `Fix balance fetching error in algorandService`

Bad commit messages:
- `Update files`
- `Fix bug`
- `WIP`
