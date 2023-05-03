import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './CoinList.css';

const CoinList = () => {
  const [coinsAr, setCoinsAr] = useState([]);
  const [coinsToShow, setCoinsToShow] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [apiPage, setApiPage] = useState(Number(localStorage.getItem('apiPage')) || 1);
  const [coinsDisplayed, setCoinsDisplayed] = useState(15);
  const [totalPages, setTotalPages] = useState(Number(localStorage.getItem('totalPages')) || 0);

  // Add a delay to limit the calls to the server in a dev enviroment
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  // Fetches coin data from the server, updates the local storage and sets the state for coins to display on the current page.
  const fetchCoins = async page => {
    try {
      await delay(1000); // The reason for this delay is because the api limits the requests per second and If you are in a dev env it does 2 req at a time.
      const response = await axios.get(`http://localhost:5000/coins/markets?page=${page}`);

      const newCoins = response.data.coins;

      let updatedCoins = [];

      // Combine the new coins data with any previously fetched data.
      if (coinsAr.length === 0) updatedCoins = newCoins;
      else updatedCoins = [...coinsAr, ...newCoins];

      localStorage.setItem('coinsAr', JSON.stringify(updatedCoins));
      localStorage.setItem('totalPages', response.data.totalPages);

      // Determine which coins to show on the current page and set the state accordingly.
      const startIndex = (currentPage - 1) * coinsDisplayed;
      const endIndex = startIndex + coinsDisplayed;
      setCoinsToShow(updatedCoins.slice(startIndex, endIndex));

      setTotalPages(response.data.totalPages);
      setCoinsAr(updatedCoins);
    } catch (error) {
      console.error(`An error occurred while fetching the coins. ${error}`);
    }
  };

  // Retrieves any previously fetched coins data from local storage. If there is none, it calls the fetchCoins function to fetch coins data from the server.
  useEffect(() => {
    const storedCoins = localStorage.getItem('coinsAr');
    if (storedCoins) {
      setCoinsAr(JSON.parse(storedCoins));
      renderPageNumbers();
    } else fetchCoins(apiPage);
  }, []);

  // It determines which coins to display on the current page and sets the state accordingly.
  useEffect(() => {
    const startIndex = (currentPage - 1) * coinsDisplayed;
    const endIndex = startIndex + coinsDisplayed;
    setCoinsToShow(coinsAr.slice(startIndex, endIndex));
  }, [currentPage, coinsDisplayed, coinsAr]);

  // Handles the pagination clicks and If I reached the totalPages I request more coins from the backend.
  const handlePageClick = pageNumber => {
    const startIndex = (pageNumber - 1) * setCoinsDisplayed;
    const endIndex = startIndex + setCoinsDisplayed;
    setCoinsToShow(coinsAr.slice(startIndex, endIndex));
    setCurrentPage(pageNumber);

    if (pageNumber !== totalPages) return;

    localStorage.setItem('apiPage', apiPage + 1);
    setApiPage(apiPage + 1);
    fetchCoins(apiPage + 1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Determine the start and end pages of the pagination links
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    // Add the first page and ellipsis if necessary
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

    // Add the page numbers between startPage and endPage
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

    // Add the last page and ellipsis if necessary
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

    // Return the array of pagination links
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
                <Link to={`/coins/${coin?.id}`} className="coinLink">
                  {coin?.name}
                </Link>
              </td>
              <td>{coin?.symbol?.toUpperCase()}</td>
              <td>${coin?.currentPrice?.toLocaleString()}</td>
              <td>${coin?.high24h?.toLocaleString()}</td>
              <td>${coin?.low24h?.toLocaleString()}</td>
              <td>{coin?.priceChangePercentage24h?.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">{renderPageNumbers()}</div>
    </>
  );
};

export default CoinList;
