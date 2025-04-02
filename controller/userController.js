const express = require('express');
const argon2 = require('argon2');
const router = express.Router();
const mongo = require('../model/dbFunctions');

router.post("/login", async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body;
    
        const user = await mongo.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ success: false, message: "Email not found" });
        }
        let isMatch = await argon2.verify(user.password, password);
        // console.log(isMatch ? "Login Success!": "Incorrect Password!");
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Wrong password" });
        }

        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email,
            // joinedForums: user.joinedForums,
            // following: user.joinedForums
        };

        if (rememberMe) {
            req.session.cookie.maxAge = 3 * 7 * 24 * 60 * 60 * 1000;
        }

        res.json({ success: true, message: "Login successful", user });
    } catch (error) {
        console.error("Error logging in: ", error);
        res.status(500).json({ message: "Error logging in" });
    }
});

router.get("/session", (req, res) => {
    if (req.session.user) {
        res.json({ success: true, user: req.session.user });
    } else {
        res.json({ success: false, message: "No active session" });
    }
});

router.post("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            return res.status(500).json({ success: false, message: "Error logging out" });
        }
        res.json({ success: true, message: "Logged out successfully" });
    });
});

router.get("/get-users", async (req, res) => {
    try {
        const sortBy = req.query.sortBy;
        const order = parseInt(req.query.order);
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);

        const users = await mongo.getUsers(sortBy, order, limit, skip);
        res.json(users);

        // console.log("Users fetched: ", users);

    } catch (error) {
        console.error("Error fetching users: ", error);
        res.status(500).json({ message: "Error fetching users" });
    }
});

router.get("/get-user-by-id/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await mongo.getUserById(userId);

        // console.log("Found user: ", user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user by ID: ", error);
        res.status(500).json({ message: "Error fetching user" });
    }
});

router.get("/get-user-by-name/:username", async (req, res) => {
    try {
        const username = req.params.username;

        const user = await mongo.getUserByName(username);

        // console.log("Found user: ", user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user by name: ", error);
        res.status(500).json({ message: "Error fetching user" });
    }
});

router.patch("/update-user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedData = req.body;

        // console.log("Updating user: ", { userId, updatedData });
        const result = await mongo.updateUser(userId, updatedData);
        // console.log("Update result: ", result);

        if (result) {
            res.json({ message: result.message });
        } else {
            res.status(400).json({ message: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating user" });
    }
});

router.put("/update-users", async (req, res) => {
    try {
        // console.log("Updating multiple users: ", req.body.users);
        const result = await mongo.updateUsers(req.body.users);
        // console.log("Update multiple users result: ", result);

        if (result.success) {
            res.json({ message: result.message });
        } else {
            res.status(500).json({ message: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating users" });
    }
});

router.post("/add-user", async (req, res) => {
    try {
        const userData = req.body;

        // console.log("Adding user: ", userData);
        const result = await mongo.addUser(userData);
        // console.log("Add user result: ", result);

        if (result) {
            res.json({ message: "User added successfully" });
        } else {
            res.status(500).json({ message: "Error adding user" });
        }
    } catch (error) {
        console.error("Error adding user: ", error);
        res.status(500).json({ message: "Error adding user" });
    }
});

router.delete("/delete-user/:userId", async (req, res) => {
    try {
        // console.log("Deleting user: ", req.params.userId);
        const result = await mongo.deleteUser(req.params.userId);
        // console.log("Delete user result: ", result);

        if (result.success) {
            res.json({ message: result.message });
        } else {
            res.status(500).json({ message: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
});

router.patch("/toggle-user-follow", async (req, res) => {
    try {
        const { userId, targetId } = req.body;

        // console.log("toggling follower", userId, targetId);

        const result = await mongo.toggleUserFollow(userId, targetId);

        if (result.success) {
            res.json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error){
        console.error("Error toggling: ", error);
        res.status(500).json({ success: false, message: "Toggling error" });
    }
});

router.get("/get-activity-by-user/:userId", async (req, res) => {
    try {
        const sortBy = req.query.sortBy;
        const order = parseInt(req.query.order);
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        const type = req.query.type;
        const userId = req.params.userId;
        const activity = await mongo.getUserActivity(userId, sortBy, order, limit, skip, type);

        res.json(activity);
    } catch (error) {
        console.error("Error fetching activity: ", error);
        res.status(500).json({ message: "Error fetching activity" });
    }
});

module.exports = router;