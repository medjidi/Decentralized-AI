const express = require('express');
const router = express.Router();
const contract = require('C:\\Users\\v7910\\OneDrive\\Документы\\GitHub\\Decentralized-AI\\blockchain-api\\src\\utils\\contract.js'); // Убедитесь, что путь правильный

router.post('/', async (req, res) => {
    try {
        const minerAddress = req.body.minerAddress; // Адрес майнера из запроса
        if (!minerAddress) {
            return res.status(400).json({ error: 'minerAddress обязательное поле' });
        }
        const tx = await contract.registerMiner(minerAddress); // Вызов функции контракта
        await tx.wait(); // Ожидание завершения транзакции
        res.status(200).json({ message: 'Майнер успешно зарегистрирован', transactionHash: tx.hash });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка регистрации майнера' });
    }
});

module.exports = router;