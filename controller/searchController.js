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
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
        }

        res.json({ success: true, message: "Login successful", user });
    } catch (error) {
        console.error("Error logging in: ", error);
        res.status(500).json({ message: "Error logging in" });
    }
});

router.get("/search", async(req, res) => {
    try{
        const keyword = req.query.search;
        const community = req.query.community;
        // console.log(keyword);
        // console.log(community);
        if(!keyword && !community){
            return res.status(404).json({ success: false, message: "Keyword not found" });
        }
        const posts = await mongo.getPostsBySearch(keyword, community);
        if(posts.length === 0){
            return res.send(`<p>No results found for "${community ? `s/${community} ${keyword || ""}`: keyword || ""}".</p>`);
        }
        let user = null;  
        if(req.session.user){
            // console.log("Session user exists:", req.session.user); //Debugging
            user =  await mongo.getUserById(req.session.user.id);
        }   
        // console.log("Posts data:", posts);    
        let renderedPosts = await Promise.all(
            posts.map((post) => {
                return new Promise((resolve, reject) => {
                    // console.log("Logged-in User:", req.session.user); //Debugging
                    res.render("partials/post", {post, user, showCommunity: true, layout: false}, (error, html) => {
                        if(error){
                            return reject(error);
                        }
                        resolve(html);
                    })
                });
            })
        );        
        // console.log("USER:", user); 
        // console.log(renderedPosts);
        const result = renderedPosts.join("");
        res.send(result);
    } catch(error){
        console.error("Error searching: ", error);
        res.status(500).json({ message: "Error searching" });
    }
});

module.exports = router;