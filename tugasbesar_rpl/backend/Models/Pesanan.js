const mongoose = require('mongoose');

const PesananSchema = new mongoose.Schema({
  nomorMeja: Number,
  items: [{
    nama: String,
    jumlah: Number,
    harga: Number
  }],
  status: {
    type: String,
    enum: ['menunggu', 'dimasak', 'siap','selesai'],
    default: 'menunggu'
  },
  total: {
    type: Number,
    default: 0
  },
  dibayar: {
    type: Boolean,
    default: false
  },
  tanggal: {
    type: Date,
    default: Date.now
  },
  waktupesan: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pesanan', PesananSchema);