const express = require("express");
const cookieparser = require("cookie-parser");
const app = express();

const postsRouter = require("./routes/posts")
const commentRouter = require("./routes/comments")
const usersRouter = require("./routes/users")
const loginRouter = require("./routes/auth")

const connect = require("./schemas")
connect();

app.use(express.json()); //request로 받아온 body값을 파싱해준다
app.use(express.urlencoded({extended : false}));
app.use(cookieparser());

app.use('/', [postsRouter, commentRouter, usersRouter, loginRouter]);

// app.get('/', (req, res) => {
//     res.send("hello World!")
// })

app.listen(3000, () => {
    console.log(3000, "포트로 서버가 열렸어요!")
})