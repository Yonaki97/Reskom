const mongoose = require('mongoose')
const UsernameSchema = new mongoose.Schema({
    username: String,
});
module.exports =mongoose.model('Username', UsernameSchema)