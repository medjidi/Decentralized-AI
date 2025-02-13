const { ethers } = require("ethers");
const { provider, wallet } = require("./web3");

const abi = [
    "function registerMiner(address _miner) public",
    "function registerUser(address _user) public",
    "function sendPrompt(string calldata _prompt) public"
];

const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, abi, wallet);

module.exports = contract;