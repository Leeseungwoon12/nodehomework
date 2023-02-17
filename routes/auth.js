const express =  require("express");
const router = express.Router();
const userSchema = require("../schemas/user");
const jwt  = require("jsonwebtoken");

//login 기능
router.post('/login' , async(req, res) => {
    const { nickname, password } = req.body;
    const userDB = await userSchema.findOne ({ nickname : nickname })

    if(!userDB || userDB.password !== password) {
        res.status(412).json({
            "errorMessage" : "닉네임 또는 패스워드를 확인해주세요."
        });
        return;
    }

    const token = jwt.sign({userId : userDB.nickname}, "customized-secret-key") //jwt 생성

    res.cookie("Authorization", `Bearer ${token}`); //jwt 토큰을 Authorization 이라는 이름을 가진 Bearer 형태로 전달
    res.status(200).json({token}) // 생성된 jwt토큰을 내보내줌
})




module.exports = router;