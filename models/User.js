const mongoose = require('mongoose')

const User = new mongoose.Schema({
    first_name: String,
    last_name: String,
    code_id: Number, //ช่าง
    tel: String, 
    address: String, //ช่าง
    user_name: String,
    password: String,
    user_role: String,
},
{
    collation: 'users'
})

module.exports = mongoose.model('User', User);