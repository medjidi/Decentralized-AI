const express = require('express');
const router = express.Router();
const contract = require('../../utils/contract');

router.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const tx = await contract.sendPrompt(prompt);
        await tx.wait();
        res.status(200).json({ message: 'Промпт успешно отправлен', transactionHash: tx.hash });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка отправки промпта' });
    }
});

module.exports = router;