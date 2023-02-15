const express = require("express");
const { findOne } = require('../schemas/post');
const router = express.Router();
const Post = require("../schemas/post")
// 게시글 작성
router.post('/posts', async(req, res) =>{
    //무엇을 가져와야 하는지
    const {user, password, title, content} = req.body
    //body또는 params를 입력받지 못한 경우
    if(!user.length || !password.length || !title.length || !content.length){
        res.status(400).json({ message : "데이터 형식이 올바르지 않습니다."})
    }
    await Post.create({ user, password, title, content });

    res.json({ "message": "게시글을 생성하였습니다"})
})
//게시글 전체 조회
router.get('/posts', async (req, res) => {
    const postlist = await Post.find()

    res.json({postlist})
});

//게시글 상세 조회
router.get('/posts/:_postId', (req, res) => {
    const { postId } = req.params;
    const [postFind] = Post.filter((post) => postId === post._id)
    res.json({postFind});
});

// // 게시글 수정
// router.put('/posts/:_postsId', (req, res)=> {
    
// })


module.exports = router;