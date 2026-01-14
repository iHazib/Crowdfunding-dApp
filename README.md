CROWDUNIT | Decentralized Crowdfunding Platform
CROWDUNIT is a premium, high-performance crowdfunding dApp built from the ground up. It leverages the Ethereum Sepolia network for secure, transparent fundraising and features a sophisticated horizontal UI designed for a high-end user experience.
Unlike generic templates, this project implements a hybrid data model, merging hardcoded featured campaigns with real-time smart contract data.

🚀 Technical Stack
Smart Contracts: Solidity 0.8.20 (Deployed on Sepolia)
Development Environment: Hardhat
Frontend: React 19 + Vite (Experimental Rolldown)
Web3 Integration: Ethers.js v6
Authentication: Privy (Non-custodial Wallet Integration)
Typography: Plus Jakarta Sans
Styling: Custom Sleek CSS (Glassmorphism & Horizontal Layout)

✨ Features
Horizontal UI Architecture: Optimized for detailed storytelling and high-end fintech aesthetics.
Dynamic Contributions: Unlike standard "fixed-tier" dApps, users can enter custom ETH amounts per campaign.
Hybrid Data Layer: Showcases "Featured" mock campaigns alongside "Live" blockchain-verified campaigns.
Privy Auth Flow: Seamless Web3 wallet connection with a focus on non-custodial security.
Real-time Progress: Dynamic progress bars calculated via on-chain data.
Fully Responsive: Adapts from ultra-wide monitors to mobile devices with custom breakpoints.

📂 Project Structure
code
Text
crowdfunding-platform/
├── web3/                # Smart Contract logic & Deployment
│   ├── contracts/       # Crowdfunding.sol
│   ├── scripts/         # Deployment scripts
│   └── hardhat.config.js
└── client/              # React frontend
    ├── src/
    │   ├── contract/    # Contract ABI
    │   ├── App.jsx      # Main Application logic
    │   └── index.css    # Premium Styling
    └── main.jsx         # Privy Provider setup
    
🛠️ Local Setup
1. Smart Contract (Web3)
code
Bash
cd web3
npm install
Create a .env file in the web3 folder:
code
Env
SEPOLIA_RPC_URL=your_alchemy_sepolia_url
PRIVATE_KEY=your_metamask_private_key
Deploy the contract:
code
Bash
npx hardhat run scripts/deploy.js --network sepolia
2. Frontend (Client)
code
Bash
cd ../client
npm install
Update App.jsx with your Contract Address and Alchemy RPC URL.
Launch the application:
code
Bash
npm run dev

📜 Smart Contract Logic
The Crowdfunding.sol contract manages:
Structs: Stores owner address, title, description, target, deadline, amount collected, and image URLs.
getCampaigns(): A gas-optimized view function that returns an array of all campaigns for the frontend to render.
donate(id): A payable function that updates the campaign state and handles ETH transfers.

🎨 UI & UX Design Decisions
Why Horizontal? To provide a "magazine" feel that emphasizes campaign descriptions and high-quality imagery, moving away from the "AI-generated grid" look.
Glassmorphism Navbar: Uses backdrop-filter to create a premium, translucent navigation bar.
Custom Input Handling: Donation amounts are tracked per-card using React state objects to prevent input conflicts across the campaign list.

🌐 Deployment
The platform is optimized for deployment on Vercel:
Set the root directory to client.
Add your PRIVY_APP_ID to the environment variables.
Whitelist the Vercel domain in your Privy Dashboard.

🛡️ License
Distributed under the MIT License. See LICENSE for more information.
