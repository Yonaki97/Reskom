const mongoose = require('mongoose')
const PasswordSchema = new mongoose.Schema({
    password: String
});
module.exports =mongoose.model('Password', PasswordSchema)