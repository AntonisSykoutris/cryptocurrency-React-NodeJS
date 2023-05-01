const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/markets', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 15;
  const skip = (page - 1) * perPage;
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${perPage}&page=${page}`
  );

  const dummyData = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      current_price: 42194.32,
      high_24h: 43029.15,
      low_24h: 41526.35,
      price_change_percentage_24h: 1.37,
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      current_price: 2939.78,
      high_24h: 2992.24,
      low_24h: 2885.76,
      price_change_percentage_24h: 1.25,
    },
    {
      id: 'ripple',
      name: 'XRP',
      symbol: 'XRP',
      current_price: 1.23,
      high_24h: 1.35,
      low_24h: 1.15,
      price_change_percentage_24h: 2.5,
    },
    {
      id: 'dogecoin',
      name: 'Dogecoin',
      symbol: 'DOGE',
      current_price: 0.35,
      high_24h: 0.38,
      low_24h: 0.31,
      price_change_percentage_24h: 3.2,
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      current_price: 1.45,
      high_24h: 1.55,
      low_24h: 1.35,
      price_change_percentage_24h: 1.9,
    },
    {
      id: 'binancecoin',
      name: 'Binance Coin',
      symbol: 'BNB',
      current_price: 390.21,
      high_24h: 410.23,
      low_24h: 380.45,
      price_change_percentage_24h: 0.75,
    },
    {
      id: 'tether',
      name: 'Tether',
      symbol: 'USDT',
      current_price: 1.0,
      high_24h: 1.01,
      low_24h: 0.99,
      price_change_percentage_24h: 0.01,
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      current_price: 46.01,
      high_24h: 48.25,
      low_24h: 43.56,
      price_change_percentage_24h: 1.65,
    },
    {
      id: 'chainlink',
      name: 'Chainlink',
      symbol: 'LINK',
      current_price: 30.21,
      high_24h: 32.45,
      low_24h: 28.34,
      price_change_percentage_24h: 1.43,
    },
    {
      id: 'polkadot',
      name: 'Polkadot',
      symbol: 'DOT',
      current_price: 37.21,
      high_24h: 39.58,
      low_24h: 34.56,
      price_change_percentage_24h: 0.95,
    },
    {
      id: 'stellar',
      name: 'Stellar',
      symbol: 'XLM',
      current_price: 0.55,
      high_24h: 0.57,
      low_24h: 0.53,
      price_change_percentage_24h: 1.75,
    },
    {
      id: 'uniswap',
      name: 'Uniswap',
      symbol: 'UNI',
      current_price: 32.15,
      high_24h: 34.18,
      low_24h: 29.66,
      price_change_percentage_24h: 2.43,
    },
    {
      id: 'bitcoin-cash',
      name: 'Bitcoin Cash',
      symbol: 'BCH',
      current_price: 923.15,
      high_24h: 978.23,
      low_24h: 867.56,
      price_change_percentage_24h: 0.85,
    },
    // Add more objects here for additional coins
  ];

  const coins = data.map(coin => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    currentPrice: coin.current_price,
    high24h: coin.high_24h,
    low24h: coin.low_24h,
    priceChangePercentage24h: coin.price_change_percentage_24h,
  }));

  const totalCoins = 100; // The total number of coins returned by the API
  const totalPages = Math.ceil(totalCoins / perPage); // Calculate the total number of pages

  res.json({ coins, totalPages });
});

module.exports = router;
