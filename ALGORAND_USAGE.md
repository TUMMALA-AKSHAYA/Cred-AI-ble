# Algorand SDK Usage in Cred-AI-ble

## Quick Reference Guide

This document provides clear examples of how Algorand blockchain is integrated into this project.

## 📦 Dependencies

Located in: `backend/package.json`
```json
"dependencies": {
  "algosdk": "^3.1.2"
}
```

## 🔧 Core Implementation Files

### 1. Algorand Service (`backend/services/algorandService.js`)

**SDK Import (Line 1):**
```javascript
const algosdk = require('algosdk');
```

**TestNet Connection (Lines 4-5):**
```javascript
const algodClient = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', '');
const indexerClient = new algosdk.Indexer('', 'https://testnet-idx.algonode.cloud', '');
```

**NFT Badge Creation (Lines 45-75):**
```javascript
const createSkillBadge = async (recipientAddress, metadata) => {
  const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    from: treasuryAccount.addr,
    total: 1,  // NFT with unique supply
    decimals: 0,
    assetName: `${metadata.careerPath} Badge`,
    unitName: 'BADGE',
    note: algosdk.encodeObj({
      type: 'skill_badge',
      score: metadata.score,
      percentile: metadata.percentile,
      career: metadata.careerPath,
      date: new Date().toISOString()
    })
  });
  
  const signedTxn = txn.signTxn(treasuryAccount.sk);
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
  await algosdk.waitForConfirmation(algodClient, txId, 4);
  
  return { assetId, txId, explorerUrl };
};
```

### 2. API Routes (`backend/routes/algorandRoutes.js`)

**Mint Badge Endpoint (Lines 25-45):**
```javascript
router.post('/mint-badge', async (req, res) => {
  const { recipientAddress, careerPath, score, percentile } = req.body;
  const result = await algorandService.createSkillBadge(recipientAddress, {
    careerPath, score, percentile
  });
  res.json({ success: true, data: result });
});
```

## 🌐 Live TestNet Deployment

**Treasury Account:**
- Address: `PBOQ6GQA3BXVTXZPC52DYUAGTSX5WKCFWL7JCEJPUH3OIB6ACWDWDGC44M`
- Explorer: https://testnet.algoexplorer.io/address/PBOQ6GQA3BXVTXZPC52DYUAGTSX5WKCFWL7JCEJPUH3OIB6ACWDWDGC44M
- Balance: 10 ALGO (TestNet)
- Funded: October 22, 2025

**Example Transaction:**
- TX ID: `2EL4XUTVWEL52PMVETBGGHKK6I5J7R6ORLOQ2MTKU3F3PJ27Z2NQ`
- View: https://testnet.algoexplorer.io/tx/2EL4XUTVWEL52PMVETBGGHKK6I5J7R6ORLOQ2MTKU3F3PJ27Z2NQ

## 🧪 Testing
```bash
# Start backend
cd backend
npm start

# Test account creation
curl -X POST http://localhost:5001/api/algorand/create-account

# Test balance check
curl http://localhost:5001/api/algorand/balance/PBOQ6GQA3BXVTXZPC52DYUAGTSX5WKCFWL7JCEJPUH3OIB6ACWDWDGC44M

# Test badge minting
curl -X POST http://localhost:5001/api/algorand/mint-badge \
  -H "Content-Type: application/json" \
  -d '{
    "recipientAddress": "YOUR_ADDRESS",
    "careerPath": "Web Development",
    "score": 85,
    "percentile": 82
  }'
```

## 📊 Features Using Algorand

1. **NFT Badge System** - Unique achievement tokens
2. **On-Chain Storage** - Immutable learning records
3. **Blockchain Verification** - Public credential validation
4. **Decentralized Identity** - User-owned achievements

## 🔗 Key Links

- [Algorand JavaScript SDK](https://github.com/algorand/js-algorand-sdk)
- [API Documentation](https://developer.algorand.org/docs/rest-apis/algod/)
- [TestNet Explorer](https://testnet.algoexplorer.io/)
