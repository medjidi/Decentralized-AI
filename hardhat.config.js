require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

const { RPC_URL, PRIVATE_KEY } = process.env;

if (!RPC_URL) {
    throw new Error('RPC_URL не указан в .env');
}

if (!PRIVATE_KEY) {
    throw new Error('PRIVATE_KEY не указан в .env');
}

module.exports = {
    defaultNetwork: "hardhat", // Локальная сеть по умолчанию
    networks: {
        hardhat: {}, // Локальная сеть Ganache
        mumbai: {
            url: RPC_URL, // URL Polygon Mumbai
            accounts: [PRIVATE_KEY],
        },
    },
    solidity: "0.8.28", // Версия Solidity вашего контракта
};