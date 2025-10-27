# Algorand Integration Guide

## Overview
This project integrates with Algorand blockchain for issuing verifiable, immutable skill credentials as NFT badges.

## Architecture

### Algorand TestNet Connection
```javascript
const algodClient = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', '');
const indexerClient = new algosdk.Indexer('', 'https://testnet-idx.algonode.cloud', '');
```

### Treasury Account
- **Address**: PBOQ6GQA3BXVTXZPC52DYUAGTSX5WKCFWL7JCEJPUH3OIB6ACWDWDGC44M
- **Balance**: 10 ALGO (TestNet)
- **Purpose**: Mint NFT badges and store achievement data

## Features Implemented

### 1. NFT Badge Minting
Every completed skill assessment generates a unique NFT on Algorand:
- **Asset Type**: Algorand Standard Asset (ASA)
- **Supply**: 1 (unique)
- **Metadata**: Embedded in transaction note
- **Cost**: ~0.001 ALGO per mint

**Implementation**: [`backend/services/algorandService.js:createSkillBadge()`](./backend/services/algorandService.js)

### 2. On-Chain Achievement Storage
Quiz results stored permanently on blockchain:
- **Method**: Zero-amount payment transactions
- **Data**: JSON-encoded in note field
- **Benefits**: Immutable, queryable, verifiable

**Implementation**: [`backend/services/algorandService.js:storeAchievement()`](./backend/services/algorandService.js)

### 3. Indexer Queries
Retrieve user's complete learning history from blockchain:
- **API**: Algorand Indexer
- **Filter**: Note prefix matching
- **Response**: Decoded achievement data

**Implementation**: [`backend/services/algorandService.js:getUserAchievements()`](./backend/services/algorandService.js)

## API Endpoints

### Mint NFT Badge
```bash
POST /api/algorand/mint-badge
{
  "recipientAddress": "ALGORAND_ADDRESS",
  "careerPath": "AI/Machine Learning",
  "score": 88,
  "percentile": 85
}
```

### Store Achievement
```bash
POST /api/algorand/store-achievement
{
  "userAddress": "ALGORAND_ADDRESS",
  "career": "Web Development",
  "score": 85,
  "percentile": 82,
  "weakAreas": [...]
}
```

### Get User Badges
```bash
GET /api/algorand/badges/:address
```

## Transaction Examples

### Successful Badge Mint
- **TX ID**: 2EL4XUTVWEL52PMVETBGGHKK6I5J7R6ORLOQ2MTKU3F3PJ27Z2NQ
- **Explorer**: https://testnet.algoexplorer.io/tx/2EL4XUTVWEL52PMVETBGGHKK6I5J7R6ORLOQ2MTKU3F3PJ27Z2NQ

## Testing

### Setup
```bash
cd backend
npm install
node scripts/generateTreasuryAccount.js
# Fund account at: https://bank.testnet.algorand.network/
```

### Run Tests
```bash
node test-setup.js  # Verify connection and balance
curl -X POST http://localhost:5001/api/algorand/mint-badge ...
```

## Roadmap

### Phase 1 (Current) ✅
- [x] Algorand SDK integration
- [x] NFT badge minting
- [x] On-chain data storage
- [x] TestNet deployment

### Phase 2 (Planned)
- [ ] PyTeal smart contracts
- [ ] AlgoKit integration
- [ ] Pera Wallet connect
- [ ] ASA token rewards
- [ ] MainNet deployment

## Resources
- [Algorand Developer Portal](https://developer.algorand.org/)
- [JavaScript SDK Docs](https://algorand.github.io/js-algorand-sdk/)
- [TestNet Dispenser](https://bank.testnet.algorand.network/)
- [AlgoExplorer TestNet](https://testnet.algoexplorer.io/)
