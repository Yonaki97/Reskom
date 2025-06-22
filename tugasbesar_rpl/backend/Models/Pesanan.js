const mongoose = require('mongoose');

const PesananSchema = new mongoose.Schema({
  nomorMeja: Number,
  items :[{
    nama: String,
    jumlah:Number,
  }
],
status: {
  type:String,
  enum :['menunggu','dimasak','selesai'],
  default: 'menunggu'
},
waktupesan:{
  type : Date,
  default: Date.now,
}
});
module.exports = mongoose.model('Pesanan', PesananSchema);
