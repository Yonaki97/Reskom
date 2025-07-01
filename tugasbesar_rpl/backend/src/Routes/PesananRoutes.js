// src/routes/pesananRoutes.js
const express = require("express");
const router = express.Router();
const Pesanan = require("../../Models/Pesanan"); // sesuaikan path

// POST
router.post("/", async (req, res) => {
  const { nomorMeja, items } = req.body;

  try {
    if (!nomorMeja || !Array.isArray(items)) {
      return res.status(400).json({ message: "Data tidak valid." });
    }

    // Hitung total pesanan
    const total = items.reduce((acc, item) => acc + (item.jumlah * item.harga), 0);

    let pesanan = await Pesanan.findOne({ nomorMeja, status: "menunggu" });

    if (!pesanan) {
      pesanan = new Pesanan({ nomorMeja, items, total });
    } else {
      pesanan.items.push(...items);
      pesanan.total += total;
    }

    await pesanan.save();
    res.status(200).json({ message: "Pesanan berhasil disimpan." });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan", error });
  }
});

// GET
router.get("/", async (req, res) => {
  try {
    const pesananAktif = await Pesanan.find({ status: "menunggu" });
    res.json(pesananAktif);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data pesanan", error });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Pesanan.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });
    }
    res.status(200).json({ message: "Pesanan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus pesanan", error });
  }
// PUT
  router.put("/:id/item", async (req, res) => {
    const { id } = req.params;
    const { namaItem } = req.body;

    try {
      const pesanan = await Pesanan.findById(id);
      if (!pesanan)
        return res.status(404).json({ message: "Pesanan tidak ditemukan" });

      const itemIndex = pesanan.items.findIndex(
        (item) => item.nama === namaItem
      );
      if (itemIndex === -1)
        return res.status(404).json({ message: "Item tidak ditemukan" });

      if (pesanan.items[itemIndex].jumlah > 1) {
        pesanan.items[itemIndex].jumlah -= 1;
      } else {
        pesanan.items.splice(itemIndex, 1);
      }

      await pesanan.save();
      res.status(200).json({ message: "Item diperbarui" });
    } catch (error) {
      res.status(500).json({ message: "Gagal memperbarui item", error });
    }
  });
});
module.exports = router;
