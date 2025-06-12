const mongoose = require('mongoose')
const DosenSchema = new mongoose.Schema({
    nama : String,
    nim : String
});
module.exports =mongoose.model('Dosen', DosenSchema)