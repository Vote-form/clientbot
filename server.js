const express = require('express');
const { generateWalletConnectUri } = require('./walletconnect');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/generate-walletconnect-uri', async (req, res) => {
  try {
    const uri = await generateWalletConnectUri();
    res.json({ uri });
  } catch (error) {
    console.error('Error generating WalletConnect URI:', error);
    res.status(500).json({ error: 'Failed to generate WalletConnect URI' });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});