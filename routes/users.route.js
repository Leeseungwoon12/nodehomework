const express = require("express");
const { Users, UserInfos } = require("../models");
const jwt = require("jsonwebtoken");
const router = express.Router();

//회원가입 API




router.post("/users", async (req, res) => {
  const { nickname, password, comfirm, name, age, gender } = req.body;
  const isExistuser = await Users.findOne({ where: { nickname } });

  if (isExistuser) {
    return res.status(412).json({ message: "중복 된 닉네임 입니다." });
  } else if (password !== comfirm) {
    return res.status(412).json({ message: "비밀번호가 일치하지 않습니다." })
  } else if(nickname !== !/^[a-zA-z0-9]{4,16}$/){
    return res.status(412).json({message : "닉네임 조건을 다시 확인해주세요."})
  } else if(password !== !/^[a-zA-z0-9]{4,16}$/ || password === nickname){
    return res.status(412).json({message : "비밀번호 조건을 다시 확인해주세요."})
  }

  const user = await Users.create({ nickname, password })

  await UserInfos.create({
    UserId: user.userId,
    name, age, gender
  });
  
  res.status(201).json({message:"회원가입이 완료되었습니다."});

});

//로그인 API

router.post("/login", async(req, res) => {
  const { nickname, password } = req.body;
  const user = await Users.findOne({ where: {nickname} });
  if(!user || user.password !== password){
    return res.status(403).json({message : "닉네임 또는 패스워드를 확인 해주세요."});
  }
  const token = jwt.sign({
    userId: user.userId
  }, "customized_secret_key");

  res.cookie("authorization", `Bearer ${token}`);

  return res.status(200).json({message: "로그인에 성공하였습니다."})
});


module.exports = router;
