# 🌟 CredAIble: AI + Blockchain Career Platform

CredAIble is an **AI + Blockchain-powered career platform** designed for students, graduates, and professionals. Its goal is to guide users from interest discovery to job readiness and provide them with **tamper-proof, verifiable credentials** that they genuinely own.

---

## 🚀 Status and Purpose of this Submission

This document serves as the **complete architectural blueprint and detailed design specification** for the CredAIble platform. The current repository contains the design documentation; **code implementation is planned for the next development phase.**

---

## ✨ Key Features

| Feature | Description | Technical Core |
| :--- | :--- | :--- |
| **AI-Powered Quiz** | Uses NLP and psychometric scoring to determine a user's true strengths and career alignment. | **Python (Scikit-learn/Transformers)** |
| **Personalized Roadmap** | Generates a structured, step-by-step learning path with measurable milestones. | **MongoDB** for storage of dynamic path data. |
| **Blockchain Credentials** | Enables users to receive **Algorand Asset Tokens (ASAs)** representing verified credentials. | **Algorand Smart Contracts (PyTeal)** |
| **Resume Verification** | Creates job-ready resumes linked to immutable, decentralized evidence. | **IPFS** for document hashing and storage. |
| **Mentor Matching** | Connects users with verified industry professionals for guidance. | Express API and matching algorithm. |
| **Gamification** | Drives user retention through a points-based system that rewards task completion. | Backend tracking in MongoDB. |

---

## 🗺️ Roadmap (User Journey)

This 8-step flow outlines the user's complete experience, from initial discovery to final job readiness:

1.  **Login & Onboarding**
    * User signs up and creates a profile.

2.  **AI-Powered Quiz**
    * User takes a short quiz to discover their true interests and strengths.

3.  **Career Path Suggestions**
    * Based on quiz results, CredAIble suggests a few potential career paths.
    * User selects their preferred path.

4.  **Personalized Roadmap**
    * A step-by-step career roadmap is generated for the chosen path.
    * Includes skill modules, daily/weekly tasks, and milestones.

5.  **Gamification with Points**
    * Users earn points for completing tasks daily.
    * Progress feels interactive and motivating.

6.  **Resume Builder (Points-Driven)**
    * Collected points unlock features in the resume builder.
    * User creates a blockchain-verified, job-ready resume.

7.  **Mentor Matching**
    * Platform connects users to mentors in their chosen career path.
    * Verified mentors provide real-time guidance.

8.  **Job Readiness**
    * Once the roadmap is completed and resume is verified, users are fully job-ready and can connect with employers.

---

## 🛠️ Technical Architecture

| Component | Technology | Rationale and Implementation Detail |
| :--- | :--- | :--- |
| **Frontend** | `React (Vite)` | Chosen for speed, modularity, and a performant Single-Page Application (SPA) experience. |
| **Backend** | `Node.js / Express` | Handles all API routes, authentication, and communication between the frontend and core services. |
| **AI/ML Modules** | `Python (Scikit-learn/Transformers)` | Used for quiz scoring, **Natural Language Processing (NLP)** on user input, and generating personalized career matching vectors. |
| **Smart Contracts** | `Algorand (PyTeal/TS SDK)` | Chosen for its low transaction fees, speed, and focus on regulatory-compliant tokenization (using **ASAs** for credential tokens). |
| **Database** | `MongoDB` | Flexible NoSQL database ideal for storing user profiles, dynamic quiz data, and personalized roadmap details. |
| **Storage** | `IPFS` | Used to store the **digital hash (CID)** of user resumes and certificates, ensuring decentralized, non-custodial, and publicly auditable evidence. |

---

## ⚙️ Technical Flow: Resume Verification

This is the core innovation of the platform:

1.  **User Action:** User finalizes their job-ready resume in the React-based Resume Builder.
2.  **Hashing:** The Express backend generates a **SHA-256 hash** of the resume file.
3.  **Decentralized Storage:** The resume file is uploaded to **IPFS**, returning a decentralized **Content Identifier (CID)**.
4.  **On-Chain Immutability:** An **Algorand Smart Contract** is executed to **mint an ASA credential token** and securely record the **IPFS CID** and the user's **public wallet address** on the Algorand blockchain. This token *is* the credential.

---

## 🖼️ Architectural Diagram & Wireframes

**(NOTE: In a real submission, place the diagram image here or link to an external file.)**

[Link to High-Level System Architecture Diagram (e.g., Figma/PDF)]

---

## 💻 How to Run (Planned)

1.  Clone the repository: `git clone [repository-url]`
2.  Install dependencies:
    * `cd frontend && npm install`
    * `cd backend && npm install`
3.  Set up environment variables for MongoDB and Algorand TestNet access.
4.  Run the application: `npm run dev` (from the root directory, starting both frontend and backend).

---

## 📞 Contact

Team DreamFit

Akshaya — [tummalaakshaya070@gmail.com]

Sirisha — [katakamsirisha53@gmail.com]
