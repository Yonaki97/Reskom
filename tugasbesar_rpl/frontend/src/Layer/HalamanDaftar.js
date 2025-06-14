// src/Layer/HalamanDaftar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../Components/popup'; // Import komponen popup

function HalamanDaftar() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupPassword, setShowPopupPassword] = useState (false)

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const Role = e.target.elements.Role.value;
    const ConfirmPassword = e.target.elements.Confirmpassword.value

    if (!username || !password || !Role) {
      setShowPopup(true);
      return;
    }
    if (password != ConfirmPassword){
      setShowPopupPassword(true)
      return;
    }
    navigate('/login');
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

        <h3 className="text-center mb-4 ">Register</h3>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input type="email" name="email" className="form-control mb-3" placeholder="Email Address" />
            <input type="text" name="username" className="form-control mb-3" placeholder="Username" />
            <input type="password" name="password" className="form-control mb-3" placeholder="Password" />
            <input type="password" name="Confirmpassword" className="form-control mb-3" placeholder="Confirm Password" />

            <select className="form-select mb-3" name= "Role" aria-label="Pilih Role">
              <option value="" disabled selected>Pilih Role</option>
              <option value="Koki">Koki</option>
              <option value="Kasir">Kasir</option>
              <option value="Pelayan">Pelayan</option>
            </select>

            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
            </div>

            <button type="submit" className="btn btn-light w-100 rounded-pill">Register</button>
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
      {/* Tampilkan popup jika showPopup true */}
      {showPopupPassword && (
        <Popup
          title="❌kata sandi tidak sesuai."
          message="Harap pastikan kata sandi dan konfirmasi kata sandi sesuai"
          onClose={() => setShowPopupPassword(false)}
        />
      )}
    </div>
  );
}

export default HalamanDaftar;
