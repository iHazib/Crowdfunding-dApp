# CROWDUNIT | Decentralized Crowdfunding Platform

**CROWDUNIT** is a premium, high-performance crowdfunding dApp built from rock bottom. It combines the security of the Ethereum Sepolia network with a sophisticated horizontal UI designed to move away from generic templates and deliver a handcrafted, professional fintech experience.

The platform utilizes a hybrid data model, merging hardcoded featured campaigns with real-time smart contract data fetched directly from the blockchain.

---

## 🚀 Technical Stack

- **Smart Contracts:** Solidity 0.8.20 (Deployed on Sepolia)
- **Framework:** Hardhat
- **Frontend:** React 19 + Vite
- **Web3 Library:** Ethers.js v6
- **Authentication:** Privy (Secure Web3 Wallet Integration)
- **Typography:** Plus Jakarta Sans
- **Styling:** Custom Sleek CSS (Glassmorphism & Horizontal Architecture)

---

## ✨ Features

- **Horizontal UI Architecture:** Optimized for detailed storytelling, moving away from the standard "AI-generated grid" look for a more professional magazine-style layout.
- **Dynamic Contributions:** Users can enter selective ETH amounts per campaign, providing a flexible fundraising experience rather than fixed donation tiers.
- **Hybrid Data Layer:** Displays "Featured" projects alongside "Live" blockchain-verified campaigns fetched via the smart contract.
- **Pure Web3 Auth:** Secure wallet connection powered by Privy, optimized for Ethereum Sepolia.
- **On-Chain Tracking:** Real-time progress bars calculated using live contract state (`amountCollected` vs `target`).
- **Responsive Engineering:** A mobile-first approach ensuring the horizontal cards stack perfectly on smaller screens.

---

## 📂 Project Structure

```text
crowdfunding-platform/
├── web3/                # Blockchain Layer
│   ├── contracts/       # Crowdfunding.sol (Logic)
│   ├── scripts/         # deploy.js (Deployment Script)
│   ├── .env             # RPC & Private Keys (Git ignored)
│   └── hardhat.config.js
└── client/              # Frontend Layer
    ├── src/
    │   ├── contract/    # Crowdfunding.json (ABI)
    │   ├── App.jsx      # Core Application logic
    │   ├── index.css    # Premium Responsive Styles
    │   └── main.jsx     # Privy Provider configuration
    └── package.json
