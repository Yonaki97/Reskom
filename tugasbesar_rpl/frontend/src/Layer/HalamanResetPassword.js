// src/Layer/HalamanResetPassword.js
import React, { useState } from 'react';
import Popup from '../Components/popup';
import { useNavigate } from 'react-router-dom';

function HalamanResetPassword() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!token || !password) {
      setPopupTitle('Gagal');
      setPopupMessage('Token dan Password baru wajib diisi!');
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/ResetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });

      const result = await response.json();

      if (response.ok) {
        setPopupTitle('Berhasil');
        setPopupMessage('Password berhasil direset. Silakan login.');
        setShowPopup(true);

        // Redirect ke login setelah 2 detik
        setTimeout(() => navigate('/'), 2000);
      } else {
        setPopupTitle('Gagal');
        setPopupMessage(result.message || 'Reset gagal. Token mungkin tidak valid.');
        setShowPopup(true);
      }
    } catch (error) {
      setPopupTitle('Error');
      setPopupMessage('Terjadi kesalahan server. Silakan coba lagi.');
      setShowPopup(true);
      console.error(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#0E2A1D' }}>
      <div className="p-4 shadow rounded" style={{ width: '400px', backgroundColor: '#C99D4D', color: 'white' }}>
        <img
          src="/dada.jpg"
          alt="Reset Avatar"
          className="rounded-circle mx-auto d-block mb-3"
          style={{ width: '100px', height: '100px', objectFit: 'cover', padding: '2px' }}
        />

        <h3 className="text-center mb-4">Reset Password</h3>

        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Token dari email"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password baru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn btn-light w-100 rounded-pill">Reset Password</button>
          </div>
        </form>

        <div className="text-center mt-3">
          <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/')}>
            ← Kembali ke Login
          </button>
        </div>
      </div>

      {showPopup && (
        <Popup
          title={popupTitle}
          message={popupMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

export default HalamanResetPassword;
