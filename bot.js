const { Telegraf } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('Welcome! Use /connect_wallet to connect your Solana wallet.');
});

bot.command('connect_wallet', async (ctx) => {
  try {
    const response = await axios.get(`${process.env.BACKEND_URL}/generate-walletconnect-uri`);
    const connectUri = response.data.uri;

    ctx.reply('Click the button below to connect your wallet:', {
      reply_markup: {
        inline_keyboard: [[{ text: 'Connect Wallet', url: connectUri }]]
      }
    });
  } catch (error) {
    console.error('Error generating WalletConnect URI:', error);
    ctx.reply('Failed to generate WalletConnect URI. Please try again.');
  }
});

bot.launch();
console.log('Telegram bot is running...');