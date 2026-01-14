import React, { useState, useEffect } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { ethers } from 'ethers';
import abiData from './contract/Crowdfunding.json';
import './App.css';

const CONTRACT_ADDRESS = "0x094A7DE54D5580D618162dff1B5904f59306219B";
const SEPOLIA_RPC = "https://eth-sepolia.g.alchemy.com/v2/HA0jJPrOJ2Aov6Qv0v4OX";

const MOCK_CAMPAIGNS = [
  {
    id: 'm1',
    title: 'Project Artemis: AI Reforestation',
    description: 'Using autonomous drones to plant 1 million trees in the Amazon basin within 12 months. Our seed-pod technology ensures 90% survival rate.',
    target: '15.0',
    collected: '8.4',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    isLive: false
  },
  {
    id: 'm2',
    title: 'CleanCurrents Ocean Cleanup',
    description: 'Deploying solar-powered barrier systems at the mouths of the top 50 polluting rivers to stop plastic before it reaches the Pacific.',
    target: '25.0',
    collected: '12.1',
    image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80&w=800',
    isLive: false
  },
  {
    id: 'm3',
    title: 'Solar Education Kits',
    description: 'Modular solar-powered labs for rural communities in sub-Saharan Africa, providing internet access and digital tools for students.',
    target: '5.0',
    collected: '4.8',
    image: 'https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?auto=format&fit=crop&q=80&w=800',
    isLive: false
  },
  {
    id: 'm4',
    title: 'Vertical Farming Hubs',
    description: 'Converting abandoned industrial warehouses in Detroit into high-yield organic vertical farms to solve urban food deserts.',
    target: '40.0',
    collected: '15.5',
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800',
    isLive: false
  },
  {
    id: 'm5',
    title: 'Rare Disease Genomic Data',
    description: 'A decentralized data vault for rare disease patients to securely share genomic data with researchers while retaining ownership.',
    target: '12.0',
    collected: '2.3',
    image: 'https://images.unsplash.com/photo-1579154276502-7bc2461d99af?auto=format&fit=crop&q=80&w=800',
    isLive: false
  }
];

function App() {
  const { login, logout, authenticated, user } = usePrivy();
  const { wallets } = useWallets();
  const [liveCampaigns, setLiveCampaigns] = useState([]);
  const [donationAmounts, setDonationAmounts] = useState({}); // Tracking input per card

  const contractAbi = abiData.abi ? abiData.abi : abiData;

  const fetchCampaigns = async () => {
    try {
      const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, provider);
      const data = await contract.getCampaigns();
      setLiveCampaigns(data.map((c, i) => ({
        id: i,
        title: c.title,
        description: c.description,
        target: ethers.formatEther(c.target),
        collected: ethers.formatEther(c.amountCollected),
        image: c.image,
        isLive: true
      })));
    } catch (err) { console.log("Blockchain fetch hidden or failed."); }
  };

  useEffect(() => { fetchCampaigns(); }, []);

  const handleInputChange = (id, value) => {
    setDonationAmounts(prev => ({ ...prev, [id]: value }));
  };

  const handleDonate = async (item) => {
    if (!authenticated) return login();
    if (!item.isLive) return alert("Mock Campaign: Please donate to a Live campaign below.");
    
    const amount = donationAmounts[item.id];
    if (!amount || isNaN(amount) || amount <= 0) return alert("Please enter a valid ETH amount.");
    
    if (!wallets[0]) return alert("Wallet not ready.");

    try {
      const provider = await wallets[0].getEthersProvider();
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);
      const tx = await contract.donate(item.id, { value: ethers.parseEther(amount) });
      await tx.wait();
      alert("Donation Confirmed!");
      fetchCampaigns();
    } catch (err) { alert("Tx Failed. Check Sepolia balance."); }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">CROWD<span>UNIT</span></div>
        <div className="nav-actions">
          {!authenticated ? (
            <button className="donate-btn" onClick={login}>Get Started</button>
          ) : (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                {user.email?.address || `${user.wallet?.address.slice(0, 6)}...`}
              </span>
              <button className="donate-btn" style={{ background: '#1e2533' }} onClick={logout}>Sign Out</button>
            </div>
          )}
        </div>
      </nav>

      <main className="app-container">
        <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Support the <span style={{ color: '#6366f1' }}>Vision.</span></h1>
          <p style={{ fontSize: '1.2rem' }}>Horizontal funding platform for early-stage innovations on Sepolia.</p>
        </header>

        <div className="campaign-list">
          {[...MOCK_CAMPAIGNS, ...liveCampaigns].map((item) => (
            <div key={item.id} className="campaign-card">
              <div className="image-section">
                <img src={item.image} alt={item.title} />
                <div className={`badge ${item.isLive ? 'live' : 'featured'}`}>
                  {item.isLive ? 'Live' : 'Featured Project'}
                </div>
              </div>

              <div className="content-section">
                <div className="header-info">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div className="donation-area">
                  <div className="stats-group">
                    <div className="stats">
                      <span style={{ fontSize: '0.9rem' }}><b>{item.collected}</b> / {item.target} ETH</span>
                    </div>
                    <div className="progress-container">
                      <div className="progress-fill" style={{ width: `${Math.min((item.collected / item.target) * 100, 100)}%` }}></div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div className="amount-input-group">
                      <input 
                        type="number" 
                        placeholder="0.1" 
                        step="0.01"
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                      />
                      <span style={{ alignSelf: 'center', paddingRight: '10px', fontSize: '0.8rem', fontWeight: 700 }}>ETH</span>
                    </div>
                    <button className="donate-btn" onClick={() => handleDonate(item)}>Contribute</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;