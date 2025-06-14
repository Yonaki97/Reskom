import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HalamanDaftar from './Layer/HalamanDaftar';
import HalamanUtamaPelayan from './Pages/HalamanUPelayan';
import HalamanLogin from './Layer/HalamanLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HalamanLogin />} />
        <Route path="/register" element={<HalamanDaftar />} />
        <Route path="/beranda" element={<HalamanUtamaPelayan />} />
      </Routes>
    </Router>
  );
}

export default App;
