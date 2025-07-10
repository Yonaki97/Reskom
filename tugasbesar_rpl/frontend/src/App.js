import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HalamanDaftar from './Layer/HalamanDaftar';
import HalamanUtamaErr from './Pages/Beranda';
import HalamanLogin from './Layer/HalamanLogin';
import HalamanMeja from './Pages/Pelayan/Meja';
import HalamanKasir from './Pages/Kasir/HalamanUKasir';
import HalamanKoki from './Pages/Koki/HalamanUKoki';
import HalamanMenu from './Pages/Pelayan/Menu';
import HalamanPelanggan from './Pages/Pelanggan/Pelanggan';
import HalamanFpassword from './Layer/HalamanForgotPassword';
import HalamanRPassword from './Layer/HalamanResetPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HalamanLogin />} />
        <Route path="/register" element={<HalamanDaftar />} />
        <Route path="/beranda" element={<HalamanUtamaErr />} />
        <Route path="/Meja" element={<HalamanMeja/>} />
        <Route path="/Menu/:nomorMeja" element ={<HalamanMenu/>}/>
        <Route path="/Kasir" element={<HalamanKasir/>} />
        <Route path="/Koki" element={<HalamanKoki/>} />
        <Route path="/Menu" element={<HalamanMenu/>}/>
        <Route path="/ForgotPassword" element= {<HalamanFpassword/>}/>
        <Route path="/ResetPassword" element={<HalamanRPassword/>}/>
        <Route path="/Pelanggan" element={<HalamanPelanggan/>}/>
      </Routes>
    </Router>
  );
}

export default App;
