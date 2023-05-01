import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Table = styled.table`
  margin: 2rem;
  border-collapse: collapse;
  max-width: 100%;
  font-size: 2rem;
  font-weight: 'bold';
  border-radius: 20rem;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 0.8rem;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.6rem;
`;

const PageNumber = styled.div`
  margin: 0 0.8rem;
  font-size: 1rem;
  cursor: pointer;
  color: ${props => (props.active ? '#fff' : '#000')};
  background-color: ${props => (props.active ? '#000' : '#ddd')};
  padding: 0.8rem 1.6rem;
  border-radius: 0.4rem;
`;

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCoins = async () => {
      const { data } = await axios.get(`http://localhost:5000/coins/markets?page=${page}`);
      // setCoins(data.coins);
      setCoins(data);
      setTotalPages(data.totalPages);
    };
    fetchCoins();
  }, [page]);

  const handlePageClick = pageNumber => {
    setPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PageNumber key={i} active={i === page} onClick={() => handlePageClick(i)}>
          {i}
        </PageNumber>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <Table>
        <thead>
          <Tr>
            <Td>Name</Td>
            <Td>Symbol</Td>
            <Td>Current Price</Td>
            <Td>High 24h</Td>
            <Td>Low 24h</Td>
            <Td>Price change 24h</Td>
          </Tr>
        </thead>
        <tbody>
          {coins?.map(coin => (
            <Tr key={coin?.id}>
              <Td>
                <Link to={`http://localhost:5000/coins/${coin?.id}`}>{coin?.name}</Link>
              </Td>
              <Td>{coin?.symbol.toUpperCase()}</Td>
              <Td>${coin?.currentPrice.toLocaleString()}</Td>
              <Td>${coin?.high24h.toLocaleString()}</Td>
              <Td>${coin?.low24h.toLocaleString()}</Td>
              <Td>{coin?.priceChangePercentage24h.toFixed(2)}%</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <Pagination>{renderPageNumbers()}</Pagination>
    </>
  );
};

export default CoinList;
