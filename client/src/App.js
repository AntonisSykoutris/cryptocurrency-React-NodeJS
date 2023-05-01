import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CoinListPage from './pages/CoinListPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<CoinListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
