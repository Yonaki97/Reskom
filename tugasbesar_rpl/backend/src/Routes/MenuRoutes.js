const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Menu = require("../../Models/Menu");

// Route GET /menu
router.get("/", async (req, res) => {
  try {
    const menus = await Menu.find(); // dari model Menu
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data menu" });
  }
});

// Buat folder uploads kalau belum ada
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Route: POST /menu
router.post("/", upload.single("gambar"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Gambar belum diunggah" });
    }

    const { nama, harga, deskripsi, kategori } = req.body;
    const gambar = `http://localhost:5000/uploads/${req.file.filename}`;
    const hargaNumber = parseFloat(harga);

    const menu = new Menu({ nama, harga: hargaNumber, deskripsi,kategori, gambar, habis: false });
    await menu.save();

    res.status(201).json(menu);
  } catch (err) {
    console.error("Error saat menambahkan menu:", err);
    res.status(500).json({ error: "Gagal menambahkan menu" });
  }
});

// Jangan lupa export router-nya
module.exports = router;
