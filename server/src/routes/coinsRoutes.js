const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/markets', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${page}&sparkline=false&locale=en`
  );

  const coins = data.map(coin => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    currentPrice: coin.current_price,
    high24h: coin.high_24h,
    low24h: coin.low_24h,
    priceChangePercentage24h: coin.price_change_percentage_24h,
  }));

  const totalCoins = 250 * page;
  const totalPages = Math.ceil(totalCoins / 15);
  console.log('Server says that total coins are:' + totalCoins);
  res.json({ coins, totalPages });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  );
  const coin = {
    currentPrice: data.market_data.current_price.usd,
    name: data.name,
    description: data.description.en,
    priceChangePercentage24h: data.market_data.price_change_percentage_24h,
    priceChangePercentage7d: data.market_data.price_change_percentage_7d,
    priceChangePercentage14d: data.market_data.price_change_percentage_14d,
    priceChangePercentage30d: data.market_data.price_change_percentage_30d,
    priceChangePercentage60d: data.market_data.price_change_percentage_60d,
    priceChangePercentage200d: data.market_data.price_change_percentage_200d,
    priceChangePercentage1y: data.market_data.price_change_percentage_1y,
    high24h: data.market_data.high_24h.usd,
    low24h: data.market_data.low_24h.usd,
  };
  res.json(coin);
});

module.exports = router;
