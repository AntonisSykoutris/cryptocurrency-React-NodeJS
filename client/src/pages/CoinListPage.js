import React from 'react';
import CoinList from '../components/CoinList';

const CoinListPage = () => {
  return (
    <div className="container">
      <h1 className="header">Cryptocurrency Prices</h1>
      <CoinList className="table" />
    </div>
  );
};

export default CoinListPage;
