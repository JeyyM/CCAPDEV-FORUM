const express = require('express');
const router = express.Router();
const mongo = require('../model/dbFunctions');

router.get("/get-forums", async (req, res) => {
    try {
        const forums = await mongo.getForums();
        res.json(forums);
        // console.log("Forums fetched: ", forums);

    } catch (error) {
        console.error("Error fetching forums: ", error);
        res.status(500).json({ message: "Error fetching forums" });
    }
});

router.get("/get-forum-by-id/:forumId", async (req, res) => {
    try {
        const forumId = req.params.forumId;

        const forum = await mongo.getForumById(forumId);

        // console.log("Found forum: ", forum);

        if (!forum) {
            return res.status(404).json({ message: "Forum not found" });
        }

        res.json(forum);
    } catch (error) {
        console.error("Error fetching forum by ID: ", error);
        res.status(500).json({ message: "Error fetching forum" });
    }
});

router.get("/get-forum-by-name/:forumName", async (req, res) => {
    try {
        const forumName = req.params.forumName;

        const forum = await mongo.getForumByName(forumName);

        // console.log("Found forum: ", forum);

        if (!forum) {
            return res.status(404).json({ message: "Forum not found" });
        }

        res.json(forum);
    } catch (error) {
        console.error("Error fetching forum by name: ", error);
        res.status(500).json({ message: "Error fetching forum" });
    }
});

router.patch("/update-forum/:forumId", async (req, res) => {
    try {
        const forumId = req.params.forumId;
        const updatedData = req.body;

        // console.log("Updating forum: ", { forumId, updatedData });
        const result = await mongo.updateForum(forumId, updatedData);
        // console.log("Update result: ", result);

        if (result) {
            res.json({ message: result.message });
        } else {
            res.status(400).json({ message: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating forum" });
    }
});

router.put("/update-forums", async (req, res) => {
    try {
        // console.log("Updating multiple forums: ", req.body.forums);
        const result = await mongo.updateForums(req.body.forums);
        // console.log("Update multiple forums result: ", result);

        if (result.success) {
            res.json({ message: result.message });
        } else {
            res.status(500).json({ message: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating forums" });
    }
});

router.post("/add-forum", async (req, res) => {
    try {
        const forumData = req.body;

        // console.log("Adding forum: ", forumData);
        const result = await mongo.addForum(forumData);
        // console.log("Add forum result: ", result);

        if (result) {
            res.json({ message: "Forum added successfully" });
        } else {
            res.status(500).json({ message: "Error adding forum" });
        }
    } catch (error) {
        console.error("Error adding forum: ", error);
        res.status(500).json({ message: "Error adding forum" });
    }
});

router.delete("/delete-forum/:forumId", async (req, res) => {
    try {
        // console.log("Deleting forum: ", req.params.forumId);
        const result = await mongo.deleteForum(req.params.forumId);
        // console.log("Delete forum result: ", result);

        if (result.success) {
            res.json({ message: result.message });
        } else {
            res.status(500).json({ message: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting forum" });
    }
});

router.patch("/toggle-forum-join", async (req, res) => {
    try {
        const {userId, forumId} = req.body;

        const result = await mongo.toggleForumJoin(userId, forumId);
    
        if (result.success){
            res.json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error){
        console.error("Error toggling: ", error);
        res.status(500).json({ success: false, message: "Toggling error" });
    }

});

module.exports = router;