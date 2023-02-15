const express = require("express");
const app = express();

const connect = require("./schemas")
connect();

app.get('/', (req, res) => {
    res.send("hello World!")
})

app.listen(3000, () => {
    console.log(3000, "포트로 서버가 열렸어요!")
})