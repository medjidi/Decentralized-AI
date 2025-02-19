const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { ethers } = require('ethers');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Blockchain connection
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = [
  "function registerMiner() external",
  "function registerUser() external",
  "function submitPrompt(string memory _content) external"
];

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Endpoints
app.post('/register/miner', async (req, res) => {
  try {
    const tx = await contract.registerMiner();
    await tx.wait();
    res.status(200).json({ message: 'Miner registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/register/user', async (req, res) => {
  try {
    const tx = await contract.registerUser();
    await tx.wait();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/prompt', async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Content is required' });

  try {
    const tx = await contract.submitPrompt(content);
    await tx.wait();
    res.status(200).json({ message: 'Prompt submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});