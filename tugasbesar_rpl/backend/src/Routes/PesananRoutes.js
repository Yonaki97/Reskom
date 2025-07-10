const express = require("express");
const router = express.Router();
const Pesanan = require("../../Models/Pesanan");

// POST pesanan baru
router.post("/", async (req, res) => {
  const { nomorMeja, items } = req.body;

  try {
    if (!nomorMeja || !Array.isArray(items)) {
      return res.status(400).json({ message: "Data tidak valid." });
    }

    const total = items.reduce(
      (acc, item) => acc + item.jumlah * item.harga,
      0
    );

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

// GET semua pesanan aktif
router.get("/", async (req, res) => {
  try {
    const pesananAktif = await Pesanan.find({ dibayar: false });
    res.json(pesananAktif);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data pesanan", error });
  }
});

// PUT tandai sebagai "dibayar"
router.put("/:id/bayar", async (req, res) => {
  try {
    const { id } = req.params;
    const now = new Date();

    const result = await Pesanan.findByIdAndUpdate(
      id,
      {
        dibayar: true,
        status: "dibayar",
        tanggal: now,
      },
      { new: true }
    );

    res.json({ message: "Pembayaran berhasil dikonfirmasi.", data: result });
  } catch (error) {
    res.status(500).json({ message: "Gagal memproses pembayaran." });
  }
});

// DELETE pesanan
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
});

// PUT kurangi jumlah item dalam pesanan
router.put("/:id/item", async (req, res) => {
  const { id } = req.params;
  const { namaItem } = req.body;

  try {
    const pesanan = await Pesanan.findById(id);
    if (!pesanan)
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });

    const itemIndex = pesanan.items.findIndex((item) => item.nama === namaItem);
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

// PUT tandai pesanan sebagai "selesai" (dari koki)
router.put("/:id/selesai", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Pesanan.findByIdAndUpdate(
      id,
      { status: "selesai" },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });

    res.status(200).json({
      message: `Pesanan Meja ${updated.nomorMeja} telah siap`,
      pesanan: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal menandai pesanan selesai", error });
  }
});

module.exports = router;
