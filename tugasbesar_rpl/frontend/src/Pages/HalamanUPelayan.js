// pages/HalamanUtama.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function HalamanUtama() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logout logika dummy
    navigate('/');
  };

  return (
    <div>
      <h2>Selamat datang di Halaman Utama!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HalamanUtama;