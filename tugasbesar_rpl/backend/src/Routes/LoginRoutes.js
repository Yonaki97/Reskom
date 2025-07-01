// src/routes/pesananRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../../Models/User');


router.post('/', async (req, res) => {
  const { userIdentifier, password } = req.body;

  if (!userIdentifier || !password) {
    return res.status(400).json({ message: 'Data tidak lengkap' });
  }
  try {
    // Cek apakah userIdentifier berupa email atau username
    const user = await User.findOne({
      $or: [{ email: userIdentifier }, { username: userIdentifier }]
    });

    if (!user) {
      return res.status(401).json({ message: 'User tidak ditemukan' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Password salah' });
    }
    
    res.status(200).json({ message: 'Login berhasil', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;