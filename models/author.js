const mongoose = require('mongoose');

//create shema in mongoose voor author


const authorShema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    }
})

//create table

module.exports = mongoose.model('Author',authorShema);
