const express = require('express');
const router = express.Router();
const contract = require('../../utils/contract');

router.post('/', async (req, res) => {
    try {
        const minerAddress = req.body.minerAddress;
        const tx = await contract.registerMiner(minerAddress);
        await tx.wait();
        res.status(200).json({ message: 'Майнер успешно зарегистрирован', transactionHash: tx.hash });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка регистрации майнера' });
    }
});

module.exports = router;