require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: require("path").join(__dirname, ".env") });

module.exports = {
  solidity: "0.8.20",
  networks: {
    fuji: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 25000000000
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};