const express = require("express");
const router = express.Router();
const postSchema = require("../schemas/post")
const commentSchema = require("../schemas/comment")
const authMiddleware = require("../middlewares/auth_middleware");
const comment = require('../schemas/comment');

//댓글 작성api
router.post('/posts/:postId/comments', authMiddleware,  async(req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { comment } = req.body
    if(!postId || !comment){
        res.status(400).json({
            "message": "데이터 형식이 올바르지 않습니다"
        })
        return;
    }
    
    await commentSchema.create({userId, comment, postId});

    res.status(201).json({"message" : "댓글을 생성하였습니다."})
});

// 댓글 목록 조회 api

router.get('/posts/:postId/comments', async(req, res) => {
    const { postId } = req.params;
    const comments = await commentSchema.find({postId:postId})
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
router.put('/posts/:postsId/comments/:_commentId',authMiddleware, async(req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { _commentId } = req.params;
    const { comment } = req.body

    const changecomment = await commentSchema.find({ userId, _id : postId , _id : _commentId })

    if (!changecomment) {
        res.status(404).json({
            "message" : "댓글 조회에 실패하였습니다."
        })
        return;
      };

    await commentSchema.updateOne(
        { userId, _id: _commentId },
        { $set: { comment: comment} }
    )
    res.status(200).json({"message": "댓글을 수정하였습니다"});
});

//댓글 삭제 api
router.delete('/posts/:postId/comments/:_commentId', authMiddleware, async(req, res)=> {
    const { userId } = res.locals.user;
    const { _commentId } = req.params;

    const existcomment= await commentSchema.findOne({ userId, _id : _commentId });
    await commentSchema.deleteOne({ userId, _id : _commentId });
    
    res.json({"message" : "댓글을 삭제하였습니다."})
});

//게시글 작성 API
router.post('/posts',authMiddleware, async(req, res) => {
    const { userId } = res.locals.user;
    const { title, content} = req.body

    await postSchema.create({ userId, title, content});

    res.status(200).json({
        "message" : "게시글을 생성하였습니다."
    })
});

//게시글 조회 API
router.get('/posts' , async(req, res) => {
    const posts = await postSchema.find({})
    const results = posts.map((detail) => {
        return {
            postId: detail._id,
            user: detail.user,
            title: detail.title, 
            //작성시간 확인필요..                        
        }
    })
    res.json({data: results});
});

// 게시글 상세 조회 API
router.get('/posts/:_postsId', async(req, res) => {
    const { _postsId } = req.params;

    const post = await postSchema.findOne({ _id : _postsId })
    

    const results = {
            postId: post._id,
            user: post.user,
            title: post.title,
            content: post.content,
            //작성시간 확인필요..                      
    }
    res.json({data: results});
});

//게시글 수정 API

router.put('/posts/:_postsId', authMiddleware, async(req, res) => {
    const { userId } = res.locals.user;
    const { _postsId } = req.params;
    const { title, content} = req.body

    const post = await postSchema.find({ userId, postId : _postsId })

    if (post.length) {
        await postSchema.updateOne(
          { userId, postId: _postsId },
          { $set: { title: title, content: content } }
        )
      };
    
    res.status(200).json({"message": "게시글을 수정하였습니다"});
});

//게시글 삭제 API
router.delete('/posts/:_postsId', authMiddleware, async(req, res)=> {
    const { userId } = res.locals.user;
    const { _postsId } = req.params;
    const existposts = await postSchema.find({ userId, _postsId });
    if(existposts.length){
        await postSchema.deleteOne({ userId, _postsId });
    }
    res.json({"message" : "게시글을 삭제하였습니다."})
});


module.exports = router;
