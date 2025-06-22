// src/Layer/HalamanForgotPassword.js
import React, { useState } from 'react';
import Popup from '../Components/popup'; // gunakan popup bawaanmu
import { useNavigate } from 'react-router-dom';

function HalamanForgotPassword() {
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setPopupTitle('Gagal');
      setPopupMessage('Email tidak boleh kosong!');
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/ForgotPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const result = await response.json();

      if (response.ok) {
        setPopupTitle('Berhasil');
        setPopupMessage('Link reset password telah dikirim ke email Anda.');
        setShowPopup(true);
      } else {
        setPopupTitle('Gagal');
        setPopupMessage(result.message || 'Gagal mengirim permintaan reset password.');
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
          alt="Forgot Avatar"
          className="rounded-circle mx-auto d-block mb-3"
          style={{ width: '100px', height: '100px', objectFit: 'cover', padding: '2px' }}
        />

        <h3 className="text-center mb-4">Lupa Password</h3>

        <form onSubmit={handleForgotPassword}>
          <div className="form-group">
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className="btn btn-light w-100 rounded-pill">Kirim Link Reset</button>
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

export default HalamanForgotPassword;





// BACKEND

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'blackleaner@gmail.com',
//     pass: '9087'
//   }
// });

// app.post('/ForgotPassword', async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) return res.json({ message: 'Email tidak ditemukan' });

//   const token = crypto.randomBytes(20).toString('hex');
//   user.resetToken = token;
//   user.tokenExpires = Date.now() + 3600000; // 1 jam
//   await user.save();

//   const link = `http://localhost:5173/ResetPassword/${token}`;

//   // Kirim email
//   try{
//     await transporter.sendMail({
//     to: user.email,
//     subject: "Reset Password",
//     html: `<a href="${link}">Klik untuk reset password</a>`
//   });

//   res.json({ message: 'Link reset dikirim ke email' });
// }catch (error) {
//     console.error("Gagal mengirim email:", error);
//     res.status(500).json({ message: "Gagal mengirim email", error: error.message });
//   }
// });


// app.post('/ResetPassword', async (req, res) => {
//   const { token, password } = req.body;
//   const user = await User.findOne({
//     resetToken: token,
//     tokenExpires: { $gt: Date.now() } // Token masih valid
//   });

//   if (!user) return res.json({ message: 'Token tidak valid atau expired' });

//   user.password = hash(password); // hash sesuai sistemmu
//   user.resetToken = undefined;
//   user.tokenExpires = undefined;
//   await user.save();

//   res.json({ message: 'Password berhasil direset' });
// });