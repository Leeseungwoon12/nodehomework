const mongoose = require("mongoose");

const connect = () => {
    mongoose
    .connect("mongodb://127.0.0.1:27017/free_board")
    .catch(err => console.log(err))
};

mongoose.connection.on("error", err => {
    console.log("몽고디비 연결에러", err);
});

module.exports = connect;