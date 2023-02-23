// 라우터로 들어오는 요청을 controllers에 전달만 하면 된다
const express = require("express");
const router = express.Router();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/', postsController.getPosts);
router.get('/postId', postsController.getPosts);
router.post('/', postsController.createPosts);
router.put('/postId', postsController.createPosts);
router.delete('/postId', postsController.createPosts);

module.exports = router;