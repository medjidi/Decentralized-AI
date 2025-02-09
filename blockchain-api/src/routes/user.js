const express = require('express');
const router = express.Router();
const contract = require('../../utils/contract');

router.post('/', async (req, res) => {
    try {
        const userAddress = req.body.userAddress;
        const tx = await contract.registerUser(userAddress);
        await tx.wait();
        res.status(200).json({ message: 'Пользователь успешно зарегистрирован', transactionHash: tx.hash });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка регистрации пользователя' });
    }
});

module.exports = router;