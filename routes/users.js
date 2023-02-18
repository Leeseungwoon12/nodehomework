const express = require("express");
const router = express.Router();
const userSchema = require("../schemas/user")

//회원가입 API
router.post("/users", async (req, res) => {
    const { nickname, password, confirmPassword } = req.body;
    // password 동일한지 확인
    if (password !== confirmPassword) {
      res.status(400).json({
        errorMessage: "패스워드가 일치하지 않습니다.",
      });
      return;
    }

    //nickname 으로 동일한 데이터 확인
    const existsUsers = await userSchema.findOne({ nickname });
      if (existsUsers) {
        // NOTE: 보안을 위해 인증 메세지는 자세히 설명하지 않습니다.
        res.status(400).json({
          errorMessage: "닉네임이 이미 사용중입니다.",
        });
        return;
      }
      
      //검증된 정보를 기반으로 User 객체 생성 및 저장
      const user = new userSchema({ nickname, password });
      await user.save();
    
      res.status(201).json({
        "message" : "회원가입이 완료되었습니다."
      });
});



module.exports = router;
