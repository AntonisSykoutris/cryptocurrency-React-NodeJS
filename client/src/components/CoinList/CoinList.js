import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './CoinList.css';

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/coins/markets?page=${page}`);
        setCoins(data.coins);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(`An error occurred while fetching the coins. ${error}`);
      }
    };
    fetchCoins();
  }, [page]);

  const handlePageClick = pageNumber => {
    setPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Calculate the start and end page numbers
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    // Add the first page button if not already displayed
    if (startPage > 1) {
      pageNumbers.push(
        <div key={1} className={`pageNumber ${page === 1 ? 'activePage' : ''}`} onClick={() => handlePageClick(1)}>
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

    // Generate the page number buttons using Array.from
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    pages.forEach(pageNumber => {
      pageNumbers.push(
        <div
          key={pageNumber}
          className={`pageNumber ${page === pageNumber ? 'activePage' : ''}`}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </div>
      );
    });

    // Add the last page button if not already displayed
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
          className={`pageNumber ${page === totalPages ? 'activePage' : ''}`}
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
          {coins?.map(coin => (
            <tr key={coin?.id}>
              <td>
                <Link to={`/coins/${coin?.id}`} className="coinLink">
                  {coin?.name}
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
