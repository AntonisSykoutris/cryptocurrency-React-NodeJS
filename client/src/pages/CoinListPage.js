import React from 'react';
import CoinList from '../components/CoinList/CoinList';
import './CoinListPage.css';
import landingImg from '../assets/img/flowers.svg';

const CoinListPage = () => {
  return (
    <div className="container">
      <h1 className="header">Cryptocurrency Prices</h1>
      <CoinList className="table" />
      <div className="containerImg">
        <img className="img" src={landingImg} alt="crypto flowers" />
      </div>
    </div>
  );
};

export default CoinListPage;
