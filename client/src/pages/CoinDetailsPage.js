import React from 'react';
import CoinDetails from '../components/CoinDetails/CoinDetails';
import { useParams } from 'react-router-dom';

const CoinDetailsPage = () => {
  const { id } = useParams();
  return (
    <div>
      <CoinDetails id={id} />
    </div>
  );
};

export default CoinDetailsPage;
