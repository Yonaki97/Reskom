// src/Layer/HalamanDaftar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../Components/popup'; // Import komponen popup

function HalamanLogin() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const userIdentifier = e.target.elements.userIdentifier.value;
    const password = e.target.elements.password.value;

    if (!userIdentifier || !password) {
      setShowPopup(true);
      return;
    }

    navigate('/beranda');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
         style={{ backgroundColor: '#0E2A1D'
          }}>
         {/* {{ backgroundImage: `url('/steak.jpg')` }}> */}

      <div className="p-4 shadow rounded"
           style={{ width: '400px', backgroundColor: '#C99D4D', color: 'white' }}>

        <img src="/dada.jpg" alt="Login Avatar"
             className="rounded-circle mx-auto d-block mb-3"
             style={{ width: '100px', height: '100px', objectFit: 'cover', backgroundColor: 'white', padding: '2px' }}
        />

        <h3 className="text-center mb-4 ">Login</h3>

        <form onSubmit={handleLogin}>
          <div className="form-group">
        <input type="text" name="userIdentifier" className="form-control mb-3" placeholder="Username atau Email"/>
            <input type="password" name="password" className="form-control mb-3" placeholder="Password" />
            <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
            </div>

            <button type="submit" className="btn btn-light w-100 rounded-pill">Login</button>
          </div>
        </form>

        <div className="text-center mt-3">
          <a href="#" className="text-light">Forgot Password?</a>
        </div>
      </div>

      {/* Tampilkan popup jika showPopup true */}
      {showPopup && (
        <Popup
          title="Login Gagal"
          message="Username dan Password wajib diisi!"
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

export default HalamanLogin;
