const express = require("express");
const app = express();

const postsRouter = require("./routes/posts")
const connect = require("./schemas")
connect();

app.use(express.json());
app.use('/', [postsRouter])

// app.get('/', (req, res) => {
//     res.send("hello World!")
// })

app.listen(3000, () => {
    console.log(3000, "포트로 서버가 열렸어요!")
})