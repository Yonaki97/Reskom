import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HalamanDaftar from './Layer/HalamanDaftar';
import HalamanUtama from './Pages/HalamanUPelayan';
import HalamanLogin from './Layer/HalamanLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HalamanDaftar />} />
        <Route path="/login" element={<HalamanLogin />} />
        <Route path="/beranda" element={<HalamanUtama />} />
      </Routes>
    </Router>
  );
}

export default App;
