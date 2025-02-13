require('dotenv').config();
const { ethers } = require("ethers");

if (!process.env.PRIVATE_KEY) {
    console.error('Ошибка: PRIVATE_KEY не указан в .env');
    process.exit(1);
}

try {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
    console.log('Кошелек успешно создан:', wallet.address);
} catch (error) {
    console.error('Ошибка создания кошелька:', error.message);
    process.exit(1);
}