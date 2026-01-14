// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Crowdfunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image; // Added for Sleek UI
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;

    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
        require(_deadline > block.timestamp, "Deadline must be in future");
        Campaign storage c = campaigns[numberOfCampaigns];
        c.owner = _owner;
        c.title = _title;
        c.description = _description;
        c.target = _target;
        c.deadline = _deadline;
        c.amountCollected = 0;
        c.image = _image;
        numberOfCampaigns++;
        return numberOfCampaigns - 1;
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for(uint i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }
        return allCampaigns;
    }

    function donate(uint256 _id) public payable {
        campaigns[_id].amountCollected += msg.value;
    }
}