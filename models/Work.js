const mongoose = require('mongoose')


const Work = new mongoose.Schema({
        events : {type:String, required:true ,trim:true},
        details : {type:String,required:true , trim:true}

},
{
    collation: 'work'
});







module.exports = mongoose.model('Work', Work);