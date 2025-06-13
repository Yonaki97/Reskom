// components/auth/HalamanLogin.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function HalamanLogin() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Login logika dummy, misal berhasil login
    navigate('/beranda');
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
      <p>Belum punya akun? <Link to="/daftar">Daftar di sini</Link></p>
    </div>
  );
}

export default HalamanLogin;
