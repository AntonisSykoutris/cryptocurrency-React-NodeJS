import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CoinDetails.css';

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/coins/${id}`)
      .then(response => {
        setCoin(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  if (!coin) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="header">{coin.name}</h1>
      <p className="description">{coin.description}</p>
      <table className="table">
        <thead>
          <tr>
            <td className="tableCat">Current Price</td>
            <td className="tableCat">High 24h</td>
            <td className="tableCat">Low 24h</td>
            <td className="tableCat">Price change 24h</td>
            <td className="tableCat">Price change 7d</td>
            <td className="tableCat">Price change 14d</td>
            <td className="tableCat">Price change 30d</td>
            <td className="tableCat">Price change 60d</td>
            <td className="tableCat">Price change 200d</td>
            <td className="tableCat">Price change 1y</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{coin.currentPrice.toLocaleString()}</td>
            <td>${coin.high24h.toLocaleString()}</td>
            <td>${coin.low24h.toLocaleString()}</td>
            <td>{coin.priceChangePercentage24h.toFixed(2)}%</td>
            <td>{coin.priceChangePercentage7d.toFixed(2)}%</td>
            <td>{coin.priceChangePercentage14d.toFixed(2)}%</td>
            <td>{coin.priceChangePercentage30d.toFixed(2)}%</td>
            <td>{coin.priceChangePercentage60d.toFixed(2)}%</td>
            <td>{coin.priceChangePercentage200d.toFixed(2)}%</td>
            <td>{coin.priceChangePercentage1y.toFixed(2)}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CoinDetails;
