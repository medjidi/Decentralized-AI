const { ethers } = require("ethers");

// Генерация нового кошелька
const wallet = ethers.Wallet.createRandom();
console.log("Private Key:", wallet.privateKey);
console.log("Address:", wallet.address);