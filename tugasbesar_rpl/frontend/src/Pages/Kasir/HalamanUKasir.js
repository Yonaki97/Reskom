// pages/HalamanUKasir.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function HalamanUKasir() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logout logika dummy
    navigate('/');
  };

  return (
    <div>
      <h2>Selamat datang di Halaman Kasir!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HalamanUKasir;