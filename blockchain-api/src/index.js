const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const minerRouter = require('./routes/miner');
const userRouter = require('./routes/user');
const promptRouter = require('./routes/prompt');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/register/miner', minerRouter);
app.use('/register/user', userRouter);
app.use('/prompt', promptRouter);

app.listen(PORT, () => {
    console.log(`API запущено на порту ${PORT}`);
});