const express = require('express');
const router = express.Router();
const mongo = require('../model/dbFunctions');

router.get("/get-comments-by-post/:postId", async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await mongo.getCommentsByPostId(postId);

        res.json(comments);
    } catch (error) {
        console.error("Error fetching comments: ", error);
        res.status(500).json({ message: "Error fetching comments" });
    }
});

router.get("/get-comments-by-author/:authorId", async (req, res) => {
    try {
        const authorId = req.params.authorId;
        const comments = await mongo.getCommentsByAuthorId(authorId);

        res.json(comments);
    } catch (error) {
        console.error("Error fetching comments: ", error);
        res.status(500).json({ message: "Error fetching comments" });
    }
});

router.patch("/update-comment/:commentId", async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const updatedData = req.body;

        // console.log("Updating comment: ", { commentId, updatedData });
        const result = await mongo.updateComment(commentId, updatedData);
        // console.log("Update result: ", result);

        if (result) {
            res.json({ message: result.message });
        } else {
            res.status(400).json({ message: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating comment" });
    }
});

router.post("/add-comment", async (req, res) => {
    try {
        const commentData = req.body;

        // console.log("Adding comment: ", commentData);
        const result = await mongo.addComment(commentData);
        // console.log("Add forum result: ", result);

        if (result) {
            res.json({ message: "Comment added successfully" });
        } else {
            res.status(500).json({ message: "Error adding comment" });
        }
    } catch (error) {
        console.error("Error adding comment: ", error);
        res.status(500).json({ message: "Error adding comment" });
    }
});

router.patch("/toggle-comment-vote", async (req, res) => {
    try {
        const { userId, commentId, voteValue } = req.body;

        // console.log("Toggling vote:", userId, commentId, voteValue);

        const result = await mongo.toggleCommentVote(userId, commentId, voteValue);

        if (result.success) {
            res.json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        console.error("Error toggling vote: ", error);
        res.status(500).json({ success: false, message: "Toggling vote error" });
    }
});

router.delete("/delete-comment/:commentId", async (req, res) => {
    try {
        // console.log("Deleting comment: ", req.params.commentId);
        const result = await mongo.deleteComment(req.params.commentId);
        // console.log("Delete comment result: ", result);

        if (result.success) {
            res.json({ message: result.message });
        } else {
            res.status(500).json({ message: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting comment" });
    }
});

module.exports = router;