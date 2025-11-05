# Algorand Blockchain Integration

## 🎯 Overview

This project uses **Algorand blockchain** to issue immutable, verifiable skill credentials as NFT badges. Every completed assessment results in:
- A unique NFT badge minted on Algorand
- Achievement data stored permanently on-chain
- Verifiable proof of skills via blockchain explorer

## 🔧 Technical Implementation

### SDK Information
- **Package**: `algosdk` v3.1.2
- **Language**: JavaScript (Node.js)
- **Network**: Algorand TestNet
- **Documentation**: https://algorand.github.io/js-algorand-sdk/

### Network Configuration
```javascript
// Algod Client (Transaction submission)
const algodClient = new algosdk.Algodv2(
  '', 
  'https://testnet-api.algonode.cloud', 
  ''
);

// Indexer Client (Historical queries)
const indexerClient = new algosdk.Indexer(
  '', 
  'https://testnet-idx.algonode.cloud', 
  ''
);
```

### Treasury Account
- **Address**: PBOQ6GQA3BXVTXZPC52DYUAGTSX5WKCFWL7JCEJPUH3OIB6ACWDWDGC44M
- **Explorer**: https://testnet.algoexplorer.io/address/PBOQ6GQA3BXVTXZPC52DYUAGTSX5WKCFWL7JCEJPUH3OIB6ACWDWDGC44M
- **Funded**: 10 ALGO (TestNet)

## 🏆 Features

### 1. NFT Badge System
Each skill achievement generates a unique Algorand Standard Asset (ASA):
- **Supply**: 1 (non-fungible)
- **Metadata**: Embedded in transaction note
- **Cost**: ~0.001 ALGO per mint
- **Speed**: 3-4 second confirmation

**Code**: [`backend/services/algorandService.js`](./backend/services/algorandService.js)

### 2. On-Chain Data Storage
Quiz results stored permanently using zero-amount transactions:
- **Method**: Payment transaction with note field
- **Data Format**: JSON-encoded achievement data
- **Benefits**: Immutable, queryable, verifiable
- **Cost**: Minimal (transaction fee only)

### 3. Blockchain Queries
Retrieve complete learning history via Algorand Indexer:
- **API**: Indexer v2
- **Filter**: Note prefix matching
- **Response**: Decoded achievement objects
- **Performance**: Fast, indexed queries

## 📊 Transaction Flow
```
User Completes Quiz
       ↓
Backend Calculates Score
       ↓
Create Asset Transaction (NFT)
       ↓
Sign with Treasury Account
       ↓
Submit to Algorand TestNet
       ↓
Wait for Confirmation (3-4s)
       ↓
Return Transaction ID & Asset ID
       ↓
User Owns Verifiable Badge
```

## 🧪 Testing

### Setup
```bash
cd backend
npm install
node scripts/generateTreasuryAccount.js
```

### Fund Account
Visit: https://bank.testnet.algorand.network/  
Paste your address and click "Dispense"

### Test Minting
```bash
node server.js

# In another terminal:
curl -X POST http://localhost:5001/api/algorand/mint-badge \
  -H "Content-Type: application/json" \
  -d '{
    "recipientAddress": "YOUR_ADDRESS",
    "careerPath": "Web Development",
    "score": 85,
    "percentile": 82
  }'
```

## 🔍 Verification

Every transaction can be verified on AlgoExplorer:
1. Copy transaction ID from API response
2. Visit: https://testnet.algoexplorer.io/
3. Paste TX ID in search
4. View complete transaction details including metadata

**Example**: https://testnet.algoexplorer.io/tx/2EL4XUTVWEL52PMVETBGGHKK6I5J7R6ORLOQ2MTKU3F3PJ27Z2NQ

## 🛣️ Roadmap

### Phase 1: SDK Integration ✅
- [x] Algorand JavaScript SDK setup
- [x] NFT badge minting
- [x] On-chain data storage
- [x] Indexer queries
- [x] TestNet deployment

### Phase 2: Smart Contracts (Planned)
- [ ] PyTeal contract development
- [ ] AlgoKit integration
- [ ] Decentralized leaderboards
- [ ] Token reward system
- [ ] Peer verification mechanism

### Phase 3: Production (Planned)
- [ ] MainNet deployment
- [ ] Pera Wallet integration
- [ ] Mobile app support
- [ ] Enterprise features
- [ ] Compliance & KYC

## 📚 Resources

- [Algorand Developer Portal](https://developer.algorand.org/)
- [JavaScript SDK Documentation](https://algorand.github.io/js-algorand-sdk/)
- [TestNet Dispenser](https://bank.testnet.algorand.network/)
- [AlgoExplorer TestNet](https://testnet.algoexplorer.io/)
- [Algorand Standards](https://github.com/algorandfoundation/ARCs)

## 💡 Why This Matters

Traditional digital credentials face challenges:
- ❌ Centralized storage (platform lock-in)
- ❌ Easy to forge
- ❌ No portable proof of skills
- ❌ Privacy concerns

Algorand blockchain solves this:
- ✅ Decentralized & immutable
- ✅ Cryptographically secure
- ✅ User-owned credentials
- ✅ Instantly verifiable globally
- ✅ Cost-effective (<$0.001/credential)

## 🏅 For Hackseries Reviewers

This project demonstrates:
1. **Practical Algorand SDK usage** in production application
2. **Real-world use case** for blockchain credentials
3. **Clean code** with proper error handling
4. **Working TestNet deployment** with funded account
5. **Comprehensive documentation** for reproducibility

All code is open-source and ready for review!
