// src/Layer/HalamanDaftar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../Components/popup'; // Import komponen popup

function HalamanDaftar() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupTitle, setShowPopupTitle] = useState(false);
  const [ShowPopupMessage, setShowPopupMessage] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const role = e.target.elements.role.value;
    const ConfirmPassword = e.target.elements.Confirmpassword.value
 

    if (!username || !password || !role || !email) {
      setShowPopupTitle("Login gagal")
      setShowPopupMessage("Mohon lengkapi semua data yang diperlukan.")
      setShowPopup(true);
      return;
    }
    if (password != ConfirmPassword){
      setShowPopupTitle("Kata Sandi tidak cocok")
      setShowPopupMessage("Silahkan ulangi")
      setShowPopup(true);
      return;
    }
try {
  const response = await fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, password, role }),
  });

  const result = await response.json();

if (response.ok) {
  setShowPopupTitle('Login Berhasil');
  setShowPopupMessage('Selamat datang!');
  setShowPopup(true);
  setTimeout(() => navigate('/'), 1500); // pindah ke /beranda setelah 1.5 detik
} else {
  setShowPopupTitle('Login Gagal');
  setShowPopupMessage(result.message);
  setShowPopup(true);
}
} catch (err) {
  alert('Terjadi kesalahan server');
  console.error(err);
}
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
         style={{ backgroundColor: '#0E2A1D'
          }}>

      <div className="p-4 shadow rounded"
           style={{ width: '400px', backgroundColor: '#C99D4D', color: 'white' }}>

        <img src="/dada.jpg" alt="Login Avatar"
             className="rounded-circle mx-auto d-block mb-3"
             style={{ width: '100px', height: '100px', objectFit: 'cover', padding: '2px' }}
        />

        <h3 className="text-center mb-4 ">Register</h3>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input type="email" name="email" className="form-control mb-3" placeholder="Email Address" />
            <input type="text" name="username" className="form-control mb-3" placeholder="Username" />
            <input type="password" name="password" className="form-control mb-3" placeholder="Password" />
            <input type="password" name="Confirmpassword" className="form-control mb-3" placeholder="Confirm Password" />

            <select className="form-select mb-3" name= "role" aria-label="Pilih Role" defaultValue="">
              <option value="" disabled>Pilih Role</option>
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
      </div>

      {/* Tampilkan popup jika showPopup true */}
      {showPopup && (
        <Popup
          title={showPopupTitle}
          message={ShowPopupMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

export default HalamanDaftar;
