// src/routes/pesananRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../../Models/User');


router.post('/', async (req, res) => {
    const { email, username, password, role } = req.body;
    if (!email || !username || !password || !role) {
      return res.status(400).json({ message: 'Data tidak lengkap' });
    }
 try {
    // Cek apakah username sudah ada
const existingUser = await User.findOne({
  $or: [
    { username: username },
    { email: email }
  ]
});
    if (existingUser) {
      return res.status(400).json({ message: 'Username/email sudah digunakan' });
    }

    // Simpan ke database
    const newUser = new User({ email, username, password, role });
    await newUser.save();
 
    res.status(201).json({ message: 'Pendaftaran berhasil', user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;