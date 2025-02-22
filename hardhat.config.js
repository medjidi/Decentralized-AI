require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: require("path").join(__dirname, ".env") });

module.exports = {
  solidity: "0.8.20",
  optimizer: {
        enabled: true,
        runs: 200 // Убедитесь, что это значение совпадает с тем, что вводите в Snowtrace
      },
  networks: {
    fuji: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1000000000
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  etherscan: {
    apiKey: {
      avalancheFujiTestnet: [process.env.ETHERSCAN_KEY]
    }
  }

};