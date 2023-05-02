import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CoinListPage from './pages/CoinListPage';
import CoinDetailsPage from './pages/CoinDetailsPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<CoinListPage />} />
        <Route exact path="/coins/:id" component={CoinDetailsPage} />
      </Routes>
    </Router>
  );
};

export default App;
