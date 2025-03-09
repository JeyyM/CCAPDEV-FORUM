const express = require('express');
const router = express.Router();
const mongo = require('../model/dbFunctions');

router.post("/login", async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body;

        const user = await mongo.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ success: false, message: "Email not found" });
        }

        if (user.password !== password) {
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
            req.session.cookie.maxAge = 60 * 60 * 1000;
        }

        res.json({ success: true, message: "Login successful", user });
    } catch (error) {
        console.error("Error logging in: ", error);
        res.status(500).json({ message: "Error logging in" });
    }
});
module.exports = router;