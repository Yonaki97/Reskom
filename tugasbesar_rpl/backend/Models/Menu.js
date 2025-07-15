const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  nama: String,
  harga: Number,
  deskripsi: String,
  kategori: String,
  gambar: String, 
  habis: Boolean,
});

module.exports = mongoose.model("Menu", menuSchema);