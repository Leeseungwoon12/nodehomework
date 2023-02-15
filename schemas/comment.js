const mongoose = require("mongoose");

const cmtSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,       
    },
    content:{
        type: String,
        required: true,    
    },
});

module.exports = mongoose.model("comment", cmtSchema );