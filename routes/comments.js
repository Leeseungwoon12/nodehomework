const express = require("express");
const router = express.Router();
const commentSchema = require('../schemas/comment')

//댓글 작성api
router.post('/comments/:_postId', async(req, res) => {
    const { _postId } = req.params;
    const { user, password, content} = req.body
    if(!_postId || !user || !password || !content){
        res.status(400).json({
            "message": "데이터 형식이 올바르지 않십니다"
        })
        return;
    }
    
    await commentSchema.create({postId:_postId, user, password, content});

    res.status(200).json({"message" : "댓글을 생성하였습니다."})
});

// 댓글 목록 조회 api

router.get('/comments/:_postId', async(req, res) => {
    const { _postId } = req.params;
    const comments = await commentSchema.find({postId:_postId})
    const results = comments.map((detail) => {
        return {
            commentId: detail._id,
            user: detail.user,
            content: detail.content, 
            //작성시간 확인필요..                        
        }
    })
    if(comments){
        res.json({data: results});
    }
});

//댓글 수정 api
router.put('/comments/:_commentId', async(req, res) => {
    const { _commentId } = req.params;
    const { password, content} = req.body

    const changecomment = await commentSchema.find({ _id : _commentId })

    if (!changecomment) {
        res.status(404).json({
            "message" : "댓글 조회에 실패하였습니다."
        })
        return;
      };

    await commentSchema.updateOne(
        { _id: _commentId },
        { $set: { password: password, content: content } }
    )
    res.status(200).json({"message": "댓글을 수정하였습니다"});
});

//댓글 삭제 api
router.delete('/comments/:_commentId', async(req, res)=> {
    const { _commentId } = req.params;
    const { password } = req.body;

    const existcomment= await commentSchema.findOne({ _id : _commentId });

    if(existcomment.password === password){
        await commentSchema.deleteOne({ _id : _commentId });
    }
    res.json({"message" : "댓글을 삭제하였습니다."})
});

module.exports = router;
