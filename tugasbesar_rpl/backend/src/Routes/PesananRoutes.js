// src/routes/pesananRoutes.js
const express = require('express');
const router = express.Router();
const Pesanan = require('../../Models/Pesanan'); // sesuaikan path

// POST /pesanan - Buat atau update pesanan
router.post('/', async (req, res) => {
  const { nomorMeja, item } = req.body;
  try {
    if (!nomorMeja || !Array.isArray(item)) {
      return res.status(400).json({ message: "Data tidak valid." });
    }

    let pesanan = await Pesanan.findOne({ nomorMeja, status: 'menunggu' });

    if (!pesanan) {
      pesanan = new Pesanan({ nomorMeja, items: item });
    } else {
      pesanan.items.push(...item);
    }

    await pesanan.save();
    res.status(200).json({ message: "Pesanan berhasil disimpan." });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan", error });
  }
});

// GET /pesanan - Ambil pesanan aktif
router.get('/', async (req, res) => {
  try {
    const pesananAktif = await Pesanan.find({ status: 'menunggu' });
    res.json(pesananAktif);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data pesanan', error });
  }
});

module.exports = router;