import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './CoinList.css';

const CoinList = () => {
  const [coinsAr, setCoinsAr] = useState([]);
  const [coinsToShow, setCoinsToShow] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [apiPage, setApiPage] = useState(1);
  const [coinsDisplayed, setCoinsDisplayed] = useState(15);
  const [totalPages, setTotalPages] = useState(0);

  const fetchCoins = async page => {
    try {
      const response = await axios.get(`http://localhost:5000/coins/markets?page=${page}`);
      const newCoins = response.data.coins;
      if (coinsAr.length === 0) {
        console.log('its empty');
        setCoinsAr(newCoins);
      } else {
        console.log('Not empty');
        setCoinsAr([...coinsAr, ...newCoins]);
      }
      console.log(apiPage);
      const startIndex = (currentPage - 1) * coinsDisplayed;
      const endIndex = startIndex + coinsDisplayed;
      setCoinsToShow(coinsAr.slice(startIndex, endIndex));
      setTotalPages(response.data.totalPages);
      console.log('New data max' + response.data.totalPages);
    } catch (error) {
      console.error(`An error occurred while fetching the coins. ${error}`);
    }
  };

  useEffect(() => {
    if (coinsAr.length === 0) fetchCoins(apiPage);
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * coinsDisplayed;
    const endIndex = startIndex + coinsDisplayed;
    console.log(currentPage);
    setCoinsToShow(coinsAr.slice(startIndex, endIndex));
  }, [currentPage, coinsDisplayed, coinsAr]);

  const handlePageClick = pageNumber => {
    const startIndex = (pageNumber - 1) * setCoinsDisplayed;
    const endIndex = startIndex + setCoinsDisplayed;
    setCurrentPage(pageNumber);
    setCoinsToShow(coinsAr.slice(startIndex, endIndex));
    if (pageNumber === totalPages) {
      setApiPage(apiPage + 1);
      fetchCoins(apiPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <div
          key={1}
          className={`pageNumber ${currentPage === 1 ? 'activePage' : ''}`}
          onClick={() => handlePageClick(1)}
        >
          1
        </div>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <div key="start-ellipsis" className="ellipsis">
            ...
          </div>
        );
      }
    }

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    pages.forEach(pageNumber => {
      pageNumbers.push(
        <div
          key={pageNumber}
          className={`pageNumber ${currentPage === pageNumber ? 'activePage' : ''}`}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </div>
      );
    });

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <div key="end-ellipsis" className="ellipsis">
            ...
          </div>
        );
      }
      pageNumbers.push(
        <div
          key={totalPages}
          className={`pageNumber ${currentPage === totalPages ? 'activePage' : ''}`}
          onClick={() => handlePageClick(totalPages)}
        >
          {totalPages}
        </div>
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <td className="tableCat">Name</td>
            <td className="tableCat">Symbol</td>
            <td className="tableCat">Current Price</td>
            <td className="tableCat">High 24h</td>
            <td className="tableCat">Low 24h</td>
            <td className="tableCat">Price change 24h</td>
          </tr>
        </thead>
        <tbody>
          {coinsToShow?.map(coin => (
            <tr key={coin?.id}>
              <td>
                <Link to={`/coins/${coin.id}`} className="coinLink">
                  {coin.name}
                </Link>
              </td>
              <td>{coin?.symbol.toUpperCase()}</td>
              <td>${coin?.currentPrice.toLocaleString()}</td>
              <td>${coin?.high24h.toLocaleString()}</td>
              <td>${coin?.low24h.toLocaleString()}</td>
              <td>{coin?.priceChangePercentage24h.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">{renderPageNumbers()}</div>
    </>
  );
};

export default CoinList;
