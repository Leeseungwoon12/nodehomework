const express = require("express");
const router = express.Router();
const postSchema = require('../schemas/post')
//게시글 작성 API
router.post('/posts', async(req, res) => {
    const { user, password, title, content} = req.body

    await postSchema.create({ user, password, title, content});

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

router.put('/posts/:_postsId', async(req, res) => {
    const { _postsId } = req.params;
    const { password, title, content} = req.body

    const post = await postSchema.find({ postId : _postsId })

    if (post.length) {
        await postSchema.updateOne(
          { postId: _postsId },
          { $set: { password: password, title: title, content: content } }
        )
      };
    
    res.status(200).json({"message": "게시글을 수정하였습니다"});
});

//게시글 삭제 API
router.delete('/posts/:_postsId', async(req, res)=> {
    const { _postsId } = req.params;
    const existposts = await postSchema.find({ _postsId });
    if(existposts.length){
        await postSchema.deleteOne({ _postsId });
    }
    res.json({"message" : "게시글을 삭제하였습니다."})
});


module.exports = router;