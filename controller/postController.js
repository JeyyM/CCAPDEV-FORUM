const express = require('express');
const router = express.Router();
const mongo = require('../model/dbFunctions');

router.get("/get-posts-by-forum/:forumId", async (req, res) => {
    try {
        const sortBy = req.query.sortBy;
        const order = parseInt(req.query.order);
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);

        const forumId = req.params.forumId;
        const posts = await mongo.getPostsByForumId(forumId, sortBy, order, limit, skip);

        // console.log(posts);

        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts: ", error);
        res.status(500).json({ message: "Error fetching posts" });
    }
});


router.get("/get-posts-by-forums/:forumIds", async (req, res) => {
    try {
        const sortBy = req.query.sortBy;
        const order = parseInt(req.query.order);
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);

        const forumIds = req.params.forumIds;
        const posts = await mongo.getPostsByForumIds(forumIds, sortBy, order, limit, skip);

        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts: ", error);
        res.status(500).json({ message: "Error fetching posts" });
    }
});

router.put("/update-posts", async (req, res) => {
    try {
        // console.log("Updating multiple posts: ", req.body.posts);
        const result = await mongo.updatePosts(req.body.posts);
        // console.log("Update multiple posts result: ", result);

        if (result.success) {
            res.json({ message: result.message });
        } else {
            res.status(500).json({ message: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating post" });
    }
});

router.patch("/update-post/:postId", async (req, res) => {
    try {
        const postId = req.params.postId;
        const updatedData = req.body;

        // console.log("Updating post: ", { postId, updatedData });
        const result = await mongo.updatePost(postId, updatedData);
        // console.log("Update result: ", result);

        if (result) {
            res.json({success: true, message: result.message, postId: postId });
        } else {
            res.status(400).json({success: false, message: result.error });
        }
    } catch (error) {
        res.status(500).json({success: true, message: "Error updating post" });
    }
});

router.post("/add-post", async (req, res) => {
    try {
        const postData = req.body;

        // console.log("Adding post: ", postData);
        const result = await mongo.addPost(postData);
        // console.log("Add forum result: ", result);

        if (result) {
            res.json({success: true, message: "Post added successfully", postId: result.toString() });
        } else {
            res.status(500).json({ message: "Error adding post" });
        }
    } catch (error) {
        console.error("Error adding post: ", error);
        res.status(500).json({success: false, message: "Error adding post" });
    }
});

router.delete("/delete-post/:postId", async (req, res) => {
    try {
        // console.log("Deleting post: ", req.params.postId);
        const result = await mongo.deletePost(req.params.postId);
        // console.log("Delete post result: ", result);

        if (result.success) {
            res.json({ message: result.message });
        } else {
            res.status(500).json({ message: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
});

router.patch("/toggle-vote", async (req, res) => {
    try {
        const { userId, postId, voteValue } = req.body;

        // console.log("Toggling vote:", userId, postId, voteValue);

        const result = await mongo.toggleVote(userId, postId, voteValue);

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

module.exports = router;