import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CoinDetails.css';

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  // useEffect(() => {
  //   const fetchCoin = async () => {
  //     const { data } = await axios.get(`http://localhost:5000/coins/${id}`);
  //     setCoin(data);
  //   };
  //   fetchCoin();
  // }, [id]);

  // if (!coin) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>aaaaaaaaaaaaaaaaaaaaaaa</h2>
      {/* <div>Current Price: ${coin.currentPrice.toLocaleString()}</div>
      <h1>{coin.name}</h1>
      <div>Price Change 24h: {coin.priceChangePercentage24h.toFixed(2)}%</div>
      <div>Price Change 7d: {coin.priceChangePercentage7d.toFixed(2)}%</div>
      <div>Price Change 14d: {coin.priceChangePercentage14d.toFixed(2)}%</div>
      <div>Price Change 30d: {coin.priceChangePercentage30d.toFixed(2)}%</div>
      <div>Price Change 60d: {coin.priceChangePercentage60d.toFixed(2)}%</div>
      <div>Price Change 200d: {coin.priceChangePercentage200d.toFixed(2)}%</div>
      <div>Price Change 1y: {coin.priceChangePercentage1y.toFixed(2)}%</div>
      <div>24h High: ${coin.high24h.toLocaleString()}</div>
      <div>24h Low: ${coin.low24h.toLocaleString()}</div> */}
    </div>
  );
};

export default CoinDetails;
