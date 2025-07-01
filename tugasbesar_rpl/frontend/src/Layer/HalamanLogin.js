// src/Layer/HalamanDaftar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../Components/popup"; // Import komponen popup

function HalamanLogin() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupTitle, setShowPopupTitle] = useState(false);
  const [ShowPopupMessage, setShowPopupMessage] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const userIdentifier = e.target.elements.userIdentifier.value;
    const password = e.target.elements.password.value;

    if (!userIdentifier || !password) {
      setShowPopupTitle("Login gagal");
      setShowPopupMessage("Username dan Password wajib diisi!");
      setShowPopup(true);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIdentifier, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setShowPopupTitle("Login Berhasil");
        setShowPopupMessage("Selamat datang!");
        setShowPopup(true);

        setTimeout(() => {
          if (result.user.role === "Pelayan") {
            navigate("/Meja");
          } else if (result.user.role === "Kasir") {
            navigate("/Kasir");
          } else if (result.user.role === "Koki") {
            navigate("/Koki");
          } else {
            navigate("/beranda");
          }
        }, 1500); // pindah ke /beranda setelah 1.5 detik
      } else {
        setShowPopupTitle("Login Gagal");
        setShowPopupMessage(result.message);
        setShowPopup(true);
      }
    } catch (error) {
      setShowPopupTitle("Server Error");
      setShowPopupMessage("Terjadi kesalahan server. Silakan coba lagi.");
      setShowPopup(true);
      console.error(error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#0E2A1D" }}
    >
      {/* {{ backgroundImage: `url('/steak.jpg')` }}> */}

      <div
        className="p-4 shadow rounded"
        style={{ width: "400px", backgroundColor: "#C99D4D", color: "white" }}
      >
        <img
          src="/dada.jpg"
          alt="Login Avatar"
          className="rounded-circle mx-auto d-block mb-3"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            padding: "2px",
          }}
        />

        <h3 className="text-center mb-4 ">Login</h3>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              name="userIdentifier"
              className="form-control mb-3"
              placeholder="Username atau Email"
            />
            <input
              type="password"
              name="password"
              className="form-control mb-3"
              placeholder="Password"
            />
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>

            <button type="submit" className="btn btn-light w-100 rounded-pill">
              Login
            </button>
          </div>
        </form>

        <div className="d-flex justify-content-between mt-3">
          <a href="ForgotPassword" className="text-light text-decoration-none">
            Forgot Password?
          </a>
          <a href="Register" className="text-light text-decoration-none">
            Register
          </a>
        </div>
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

export default HalamanLogin;
