const mongoose = require("mongoose");

const cmtSchema = new mongoose.Schema({
    
    userId:{
        type: String,
        required: true,
    },
    comment:{
        type: String,
        required: true,    
    },
    postId:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("comment", cmtSchema );