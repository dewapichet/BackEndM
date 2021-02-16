const mongoose = require('mongoose')


const User = new mongoose.Schema({
    first_name: {type: String, required: true, trim: true},
    last_name: {type: String, required: true,trim: true},
    code_id: {type : Number ,trim: true}, //ช่าง
    tel: {type: String, required: true, trim: true }, 
    address: {type : String ,trim: true}, //ช่าง
    user_name: {type: String, required: true ,trim: true },
    password: {type: String, required: true , trim: true},
    role : {type : String , default : "user", enum : ["user","mec"]}
},
{
    collation: 'users'
});







module.exports = mongoose.model('User', User);