// updated web3/scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const Crowdfunding = await hre.ethers.getContractFactory("Crowdfunding");
  const contract = await Crowdfunding.deploy();
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  
  console.log("Contract deployed to:", address);

  // Optional: Create an initial campaign so the "Live" section isn't empty
  const [owner] = await hre.ethers.getSigners();
  const deadline = Math.floor(Date.now() / 1000) + 604800; // 7 days from now
  
  await contract.createCampaign(
    owner.address, 
    "First Live Campaign", 
    "This is from the blockchain!", 
    hre.ethers.parseEther("1.0"), 
    deadline, 
    "https://images.unsplash.com/photo-1509391366360-fe5bb58583bb"
  );
  
  console.log("Initial live campaign created!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});