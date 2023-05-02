import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CoinListPage from './pages/CoinListPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<CoinListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
