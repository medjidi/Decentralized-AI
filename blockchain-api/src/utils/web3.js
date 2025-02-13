require('dotenv').config();
const { ethers } = require("ethers");

// Проверка переменных окружения
if (!process.env.PRIVATE_KEY || !process.env.RPC_URL) {
    console.error('Ошибка: PRIVATE_KEY или RPC_URL не указаны в .env');
    throw new Error('PRIVATE_KEY или RPC_URL не указаны в .env');
}

console.log('Загружен PRIVATE_KEY:', process.env.PRIVATE_KEY);
console.log('Загружен RPC_URL:', process.env.RPC_URL);

// Создание провайдера
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

let wallet;
try {
    wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    console.log('Кошелек успешно создан:', wallet.address);
} catch (error) {
    console.error('Ошибка создания кошелька:', error.message);
    throw error; // Прерываем выполнение, если кошелек не создан
}

console.log('Экспорт provider и wallet');
module.exports = {
    provider,
    wallet // Убедитесь, что wallet определен
};