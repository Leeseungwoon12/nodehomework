const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/user");


module.exports = async (req, res, next) => {
    const { Authorization }  = req.cookies; //브라우저에서 쿠키 전달 받고
    const [ authType, authToken ] = (Authorization ?? "").split(" "); //Bearer,header.payload.signature로 분리

    //쿠키로 전달받은 토큰 값 검증
    if(authType !== "Bearer" || !authToken){
        res.status(403).json({
            errorMessage : "로그인 후에 이용할 수 있는 기능입니다."
        });
        return;
    }

    try{
        //authToken이 만료 되었는지, authToken이 서버가 발급한 토큰이 맞는지 검증
        const {userId} = jwt.verify(authToken, "customized-secret-key" );

        const user = await userSchema.findById(userId); //검증한 토큰 값으로 ID조회
        res.locals.user = user;

        next();
    }catch(error){
        console.error(error);
        res.status(400).json({ errorMessage : " 로그인 후에 이용할 수 있는 기능입니다."})
        return;
    }
}
