import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import RentalProperties from './components/RentalProperties';
import SaleProperties from './components/SaleProperties';
import { Routes, Route } from 'react-router';

function App() {
  
  return (
    <div className='App'>
      <Navigation />
      <Routes>
          <Route path='/' element={<Home />} />
            <Route path='rental-properties' element={<RentalProperties />} />
            <Route path='sale-properties' element={<SaleProperties />} />
      </Routes>
    </div>
  );
}

export default App;
