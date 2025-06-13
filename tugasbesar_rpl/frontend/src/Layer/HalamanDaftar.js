// src/Layer/HalamanDaftar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function HalamanDaftar() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    if (!username || !password) {
      alert("Username dan password wajib diisi!");
      return;
    }
    navigate('/login');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
         style={{ backgroundImage: `url('/steak.jpg')` }}>
      <div className="p-4 shadow rounded"
           style={{ width: '400px', background: 'linear-gradient(to bottom,#0E2A1D ,#C99D4D)', color: 'white' }}>

        <img
          src="/dada.jpg"
          alt="Login Avatar"
          className="rounded-circle mx-auto d-block mb-3"
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            backgroundColor: 'white',
            padding: '2px',
          }}
        />

        <h3 className="text-center mb-4">LOG IN</h3>

        {/* ✅ FORM dibungkus di sini */}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              name="username" // ✅ tambahkan name
              className="form-control mb-3"
              placeholder="Username"
            />
            <input
              type="password"
              name="password" // ✅ tambahkan name
              className="form-control mb-3"
              placeholder="Password"
            />
            <select class="form-select" aria-label="Default select example">
  <option value="" selected disabled>Pilih Role</option>
  <option value="Koki">Koki</option>
  <option value="Kasir">Kasir</option>
<option value="Pelayan">Pelayan</option>
</select>

            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
            </div>
            <button
              type="submit" // ✅ type submit
              className="btn btn-light w-100 rounded-pill"
            >
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <a href="#" className="text-light">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
}

export default HalamanDaftar;
