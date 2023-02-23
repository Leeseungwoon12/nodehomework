
const { Posts } = require('../models');

class PostRepository {
    // 게시물 생성 repo
    createPost = async( title, content, userId ) => {
    await Posts.create({
            UserId: userId,
            title,
            content
        });

    return;
    };

    //게시물 목록 조회 repo
    findAllPost = async() => {
        const posts = await Posts.findAll({
            attributes: ['postId', 'UserId', 'title', 'createdAt', 'updatedAt']
        });

        return posts;
    }
    
    //게시물 상세 조회 repo
    findOnePost = async(postId) => {
        const post = await Posts.findOne(
            {
                where: { postId }
            });

        return post;
    }

    //게시글 수정 repo
    updatePost = async(postId, title, content) => {
        await Posts.update(
            {title, content},
            {
                where: { postId }
            }
        );
        return;
    }

    //게시물 삭제 repo
    deletePost = async(postId) => {
        await Posts.destroy(
            { 
                where: { postId }
            });
        return;
    }

}