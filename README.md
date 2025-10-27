<h1 align="center">🌐 Career Discovery Platform with Algorand Blockchain</h1>

<p align="center">
Empowering students and professionals with AI-guided career paths and <b>Algorand-verified credentials</b>.
</p>

<p align="center">
  <a href="https://algorand.com"><img src="https://img.shields.io/badge/Blockchain-Algorand-00D1B2?style=for-the-badge&logo=algorand"></a>
  <a href="https://testnet.algoexplorer.io/"><img src="https://img.shields.io/badge/Network-TestNet-orange?style=for-the-badge"></a>
  <a href="https://github.com/algorand/js-algorand-sdk"><img src="https://img.shields.io/badge/SDK-algosdk%20v3.1.2-blue?style=for-the-badge"></a>
</p>

---

### 🧩 Overview

This project integrates the **Algorand blockchain** to issue **NFT-based skill badges**, store **on-chain achievements**, and verify **career credentials** in a decentralized and tamper-proof way.

---

## 🎯 Vision

**CredAIble** bridges the gap between *career discovery* and *verified skill ownership*, guiding users from **interest identification** to **job readiness** through **AI-driven insights and blockchain authentication**.

---

<details>
<summary>✨ <b>Core Features</b></summary>

| Feature | Description | Technical Core |
| :--- | :--- | :--- |
| 🧠 **AI-Powered Quiz** | Uses NLP and psychometric scoring to determine a user's strengths and career alignment. | Python (Scikit-learn / Transformers) |
| 🗺️ **Personalized Roadmap** | Generates a step-by-step learning path with measurable milestones. | MongoDB |
| 🔗 **Blockchain Credentials** | Issues Algorand ASAs representing verified credentials. | Algorand Smart Contracts (PyTeal) |
| 📜 **Resume Verification** | Creates job-ready resumes linked to immutable blockchain proof. | IPFS + Algorand |
| 🤝 **Mentor Matching** | Connects users with verified industry experts for mentorship. | Express API |
| 🎮 **Gamification** | Rewards users with points and NFT badges for completing milestones. | MongoDB & Algorand |

</details>

---

<details>
<summary>🔗 <b>Algorand Blockchain Integration</b></summary>

### 💰 **Live Algorand TestNet Account**
- 🪙 **Treasury Address:** [`PBOQ6GQA3BXVTXZPC52DYUAGTSX5WKCFWL7JCEJPUH3OIB6ACWDWDGC44M`](https://testnet.algoexplorer.io/address/PBOQ6GQA3BXVTXZPC52DYUAGTSX5WKCFWL7JCEJPUH3OIB6ACWDWDGC44M)
- 🌍 **Network:** Algorand TestNet  
- 💵 **Balance:** 10 ALGO  
- 🔎 **Example Transaction:** [View on AlgoExplorer](https://testnet.algoexplorer.io/tx/2EL4XUTVWEL52PMVETBGGHKK6I5J7R6ORLOQ2MTKU3F3PJ27Z2NQ)

---

### ⚙️ **Algorand SDK Implementation**
Using **Algorand JavaScript SDK (v3.1.2)** for:
- ✅ NFT Badge Minting  
- ✅ On-Chain Data Storage  
- ✅ Account Management  
- ✅ Blockchain Queries (Indexer API)

**Key Files:**

backend/
├── services/
│   └── algorandService.js        # Core blockchain logic
├── routes/
│   └── algorandRoutes.js         # REST API endpoints
└── scripts/
    └── generateTreasuryAccount.js # Account creation script

```
````
#### 🪙 **NFT Badge Creation Example**
javascript
const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
  from: treasuryAccount.addr,
  total: 1,
  decimals: 0,
  assetName: ${metadata.careerPath} Badge,
  unitName: 'BADGE',
  note: algosdk.encodeObj({
    type: 'skill_badge',
    score: metadata.score,
    percentile: metadata.percentile,
    career: metadata.careerPath
  })
});


#### 🧾 **On-Chain Achievement Storage Example**

javascript
const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
  from: treasuryAccount.addr,
  to: userAddress,
  amount: 0,
  note: algosdk.encodeObj({
    type: 'achievement',
    career: achievementData.career,
    score: achievementData.score,
    date: new Date().toISOString()
  })
});


---

### 🌟 **Algorand Advantages**

| Advantage           | Description                                  |
| :------------------ | :------------------------------------------- |
| ⚡ **Fast**          | 3–4 second transaction finality              |
| 💸 **Low-Cost**     | < $0.001 per transaction                     |
| 🌱 **Eco-Friendly** | Carbon-negative blockchain                   |
| 🔒 **Secure**       | Tamper-proof credentials                     |
| 🌐 **Scalable**     | 1000+ TPS — perfect for educational adoption |

</details>

---

<details>
<summary>🗺️ <b>User Journey</b></summary>

1️⃣ **Login & Onboarding** – Create a user profile
2️⃣ **AI-Powered Quiz** – Discover strengths and interests
3️⃣ **Career Path Suggestions** – Choose from 3 recommended options
4️⃣ **Personalized Roadmap** – Step-by-step learning guide
5️⃣ **Gamification** – Earn coins and badges for progress
6️⃣ **Resume Builder** – Create a blockchain-verified resume
7️⃣ **Mentor Matching** – Connect with verified mentors
8️⃣ **Job Readiness** – Become employable and verifiable

</details>

---

<details>
<summary>🧠 <b>Technical Architecture</b></summary>

| Component         | Technology                           | Purpose                         |
| :---------------- | :----------------------------------- | :------------------------------ |
| 💻 **Frontend**   | React (Vite + Tailwind)              | Fast and modern UI              |
| ⚙️ **Backend**    | Node.js / Express                    | APIs and Algorand integration   |
| 🧠 **AI/ML**      | Python (Scikit-learn / Transformers) | Quiz scoring and insights       |
| 🔗 **Blockchain** | Algorand (PyTeal / JS SDK)           | Credential issuance             |
| 🗃️ **Database**  | MongoDB                              | User data and progress tracking |
| 🧾 **Storage**    | IPFS                                 | Resume & document verification  |

</details>

---

<details>
<summary>💰 <b>Business Model</b></summary>

🎓 **Freemium Access** – Free quizzes & career paths
💼 **Premium Add-ons** – Resume AI reviews & mentorship
🏫 **Institutional Plans** – Colleges issue blockchain credentials
🪙 **Token Economy** – Earn & redeem tokens for learning resources

</details>

---
## 🧪 Algorand SDK Verification

To confirm Algorand blockchain functionality, run:

```bash
cd backend
node scripts/testAlgorandIntegration.js
```
---

## 🧩 Demo Proofs

### 🎓 Verified Blockchain Integration

Our platform uses the **Algorand TestNet** to issue verifiable credentials as NFTs and store achievements on-chain.  
Below are live proofs of blockchain interaction performed through our backend service.

| Feature | Description | TestNet Proof |
| :-- | :-- | :-- |
| 🪙 **Treasury Wallet** | Platform’s verified Algorand TestNet treasury used for all transactions. | [PBOQ6GQA3BXVTXZPC52DYUAGTSX5WKCFWL7JCEJPUH3OIB6ACWDWDGC44M](https://testnet.algoexplorer.io/address/PBOQ6GQA3BXVTXZPC52DYUAGTSX5WKCFWL7JCEJPUH3OIB6ACWDWDGC44M) |
| 🏅 **NFT Badge Minting** | Smart contract-created ASA for verified career achievements. | [View Example Transaction](https://testnet.algoexplorer.io/tx/2EL4XUTVWEL52PMVETBGGHKK6I5J7R6ORLOQ2MTKU3F3PJ27Z2NQ) |
| 📜 **On-Chain Data Storage** | User quiz results & achievements encoded in transaction notes. | ✅ Implemented via `storeAchievement()` in [algorandService.js](./backend/services/algorandService.js) |
| 💰 **Token Rewards** | Platform rewards users for learning milestones using ALGO micropayments. | 🧠 Function: `rewardTokens()` |
| 🔎 **Data Verification** | Uses Algorand Indexer API to retrieve and verify transactions. | Function: `verifyTransaction()` |

All transactions are verified on **Algorand TestNet**, ensuring transparency, immutability, and ownership of digital credentials.

---

### 🖼️ Screenshots (UI Preview)

| Quiz & Roadmap | Blockchain Dashboard |
| :--: | :--: |
| ![Quiz Preview](./assets/screenshots/quiz.png) | ![Blockchain Dashboard](./assets/screenshots/dashboard.png) |

---


## ⚙️ How to Run Locally

```bash
# ---------- SETUP INSTRUCTIONS ----------

# Step 1: Clone the repository
git clone https://github.com/TUMMALA-AKSHAYA/Cred-AI-ble.git
cd Cred-AI-ble

# Step 2: Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Step 3: Configure environment variables (.env)
# Include MongoDB URI, Algorand TestNet details, and treasury mnemonic

# Step 4: Start the app
npm run dev
```
---

## 👥 **Team**

| Name                | Role                      | Contact                                                           |
| :------------------ | :------------------------ | :---------------------------------------------------------------- |
| **Akshaya Tummala** | UI/UX & Backend Developer | [tummalaakshaya070@gmail.com](mailto:tummalaakshaya070@gmail.com) |
| **Sirisha Katakam** | AI & Frontend Developer   | [katakamsirisha53@gmail.com](mailto:katakamsirisha53@gmail.com)   |

---

## 🏁 **Future Goals**

🚀 Launch public MVP
🤝 Partner with universities
💰 Secure seed funding & Algorand grant
📱 Develop mobile app version

---

<p align="center"><b>CredAIble — Redefining Careers with AI & Blockchain 🚀</b></p>

---
