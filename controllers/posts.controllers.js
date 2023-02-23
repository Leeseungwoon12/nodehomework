const PostService = require('../services/posts.service')

class PostsController {
    postService = new PostService();

    //게시글 생성
    createPost = async(req, res, next) => {
        const { title, content } = req.body;
        const { userId } = res.locals.user;
        
        const addPost = await this.postService.createPost(userId, title, content);

        res.status(200).json({data : addPost})
    }

    //게시글 조회
    getPost = async(req, res, next) => {
        
        const posts = await this.postService.findAllPost();

        res.status(200).json({ data: posts })
    }

    //게시글 상세 조회
    getOnePost = async(req, res, next) => {
        const { postId }= req.params;
        const post = await this.postService.findOnePost(postId);
        
        res.status(200).json({data : post })
    }

    //게시글 수정
    updatePost = async(req, res, next) => {
        const {title, content} = req.body;
        const {postId} = req.params;

        await this.postService.updatePost(postId, title, content);

        res.status(200).json({ message: "게시글 수정이 완료되었습니다."})
    }

    //게시글 삭제
    deletePost = async( req, res, next) => {
        const { postId } = req.params;
        
        await this.postService.deletePost( postId )

        res.status(200).json({ message: "게시물 삭제가 완료되었습니다."})
    }

    
}

module.exports = PostsController;