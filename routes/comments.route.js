const express = require("express");
const { comments } = require("../models");
const { Users } = require("../models");
const authMiddleware = require("../middlewares/auth_middleware");
const { Op } = require("sequelize");
const router = express.Router();

//댓글 작성 API
router.post("/posts/:postId/comments", authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { postId } = req.params;
  const { comment } = req.body;

  const user = await Users.findOne({ where: { userId } });

  const savecomment = await comments.create({
    UserId: userId,
    PostId: postId,
    nickname: user.nickname,
    comment,
  });

  return res.status(201).json({ data: savecomment });
});

//댓글 조회 API
router.get("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  console.log(postId);
  const showcomments = await comments.findAll({
    attributes: [
      "commentId",
      "userId",
      "nickname",
      "comment",
      "createdAt",
      "updatedAt",
    ],
    where: {
      PostId: postId,
    },
    order: [["createdAt", "DESC"]],
  });

  return res.status(200).json({ data: showcomments });
});

// //댓글 수정 API
router.put("/posts/:postId/comments/:commentId", authMiddleware, async (req, res) => {
    const { userId } = res.locals.user;
    const { postId, commentId } = req.params;
    const { comment } = req.body;

    const targetComment = await comments.findOne({
      where: { commentId },
    });
    if (!targetComment) {
      return res.status(404).json({ message: "존재하지 않는 댓글입니다." });
    } else if (targetComment.UserId !== userId) {
      return res
        .status(400)
        .json({ message: "게시글을 수정할 권한이 없습니다." });
    };

    await comments.update(
      { comment },
      {
        where: {
          [Op.and]: [{ postId, commentId }, { UserId: userId }],
        },
      }
    );
      return res.status(200).json({ message : "댓글 수정이 완료되었습니다."})
  });

//댓글 삭제 API

router.delete("/posts/:postId/comments/:commentId", authMiddleware, async (req, res) => {
    const { userId } = res.locals.user;
    const { postId, commentId } = req.params;

    const targetComment = await comments.findOne({
      where: { postId, commentId },
    });
    if (!targetComment) {
      return res.status(404).json({ message: "존재하지 않는 댓글입니다." });
    } else if (targetComment.UserId !== userId) {
      return res
        .status(400)
        .json({ message: "게시글을 삭제 할 권한이 없습니다." });
    };

    await comments.destroy(
      {
        where: {
          [Op.and]: [{ postId, commentId }, { UserId: userId }],
        },
      }
    );
      return res.status(200).json({ message : "댓글 삭제가 완료되었습니다."})
  });

module.exports = router;
