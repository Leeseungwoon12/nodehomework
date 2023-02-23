const PostsRepository = require('../repositories/posts.repositories')

class PostService {
  postsRepository = new PostsRepository ()

  //게시글 생성
  createPost = async( userId, title, content ) => {
  const addPost = await this.postsRepository.create({userId, title, content})
  
  return addPost;
  }

  //게시글 목록 조회
  findAllPost = async() => {
    const posts = await this.postsRepository.findAllPost();
    posts.sort((a , b) => {
      return b.createdAt - a.createdAt;
    })
    return posts;
  };
  
  //게시글 상세 조회
  findOnePost = async( postId ) => {
    const post = await this.postsRepository.findOnePost({ postId });
    return post;
  }
  
  //게시글 수정
  updatePost = async( postId, title, content) => {
    await this.postsRepository.updatePost({postId, title, content})
    return;
  }

  //게시글 삭제
  deletePost = async( postId ) => {
    await this.postsRepository.deletePost({postId})
    
    return;
  }
}