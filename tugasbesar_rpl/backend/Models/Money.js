const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Koki', 'Kasir', 'Pelayan'], required: true }
});

module.exports = mongoose.model('User', UserSchema);
