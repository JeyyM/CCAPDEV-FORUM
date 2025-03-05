const express = require("express");
const mongo = require("./model/dbFunctions");
const session = require("express-session");
const bodyParser = require("body-parser")

const fs = require("fs");
const path = require("path");

const server = express();

server.use(session({
    secret: "fuckingpassword",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60 // to do 1 hour
    }
}));

server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

const handlebars = require('express-handlebars');
server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
        isEqual: (x, y) => x === y,
        isNull: (x) => x === null 
    }
}));

server.use(express.static('public'));

function getCSSFiles() {
    const stylesDir = path.join(__dirname, "public/styles");
    return fs.readdirSync(stylesDir)
        .filter(file => file.endsWith(".css"))
        .map(file => `/styles/${file}`);
}

server.use((req, res, next) => {
    res.locals.cssFiles = getCSSFiles();
    next();
});

//////////////////////////////// Placeholders ///////////////////////////////////////////////
const user = {
    userId: 1,
    userName: "BuilderMia",
    profilePic: "/images/mia.jpg",
    bannerPic: "/images/bannerMia",
    bio: "Passionate Minecraft builder who loves creating everything from cozy cottages to massive castles! Always experimenting with different styles, from medieval to modern. If you need building tips or design inspiration, I'm happy to help!",
    followers: 10,
    posts: 2,
    comments: 5
};
// const user = null;

const myCommunities = [
    {
        communityId: 1,
        communityName: "Minecraft",
        communityIcon: "/images/minecraft.jpg",
        bannerPic: "/images/bannerMinecraft.jpg",
        description: "Welcome to the ultimate Minecraft hub! Whether you're a redstone genius, a master builder, a hardcore survivor, or just starting out, this is the place for you. Share your epic builds, survival adventures, redstone creations, and favorite seeds. Ask for tips, discuss updates, and connect with fellow crafters. Let's build, explore, and survive together!",
        members: 25,
        posts: 9,
    }
];

const communities = [
    {
        communityId: 1,
        communityName: "Minecraft",
        communityIcon: "/images/minecraft.jpg",
        bannerPic: "/images/bannerMinecraft.jpg",
        description: "Welcome to the ultimate Minecraft hub! Whether you're a redstone genius, a master builder, a hardcore survivor, or just starting out, this is the place for you. Share your epic builds, survival adventures, redstone creations, and favorite seeds. Ask for tips, discuss updates, and connect with fellow crafters. Let's build, explore, and survive together!",
        members: 25,
        posts: 9,
    },
    {
        communityId: 2,
        communityName: "Anime",
        communityIcon: "/images/anime.jpg",
        bannerPic: "/images/bannerMinecraft.jpg",
        description: "Welcome to the ultimate Minecraft hub! Whether you're a redstone genius, a master builder, a hardcore survivor, or just starting out, this is the place for you. Share your epic builds, survival adventures, redstone creations, and favorite seeds. Ask for tips, discuss updates, and connect with fellow crafters. Let's build, explore, and survive together!",
        members: 25,
        posts: 9,
    },
    {
        communityId: 3,
        communityName: "CS:GO",
        communityIcon: "/images/csgo.jpg",
        bannerPic: "/images/bannerMinecraft.jpg",
        description: "Welcome to the ultimate Minecraft hub! Whether you're a redstone genius, a master builder, a hardcore survivor, or just starting out, this is the place for you. Share your epic builds, survival adventures, redstone creations, and favorite seeds. Ask for tips, discuss updates, and connect with fellow crafters. Let's build, explore, and survive together!",
        members: 25,
        posts: 9,
    },
    {
        communityId: 4,
        communityName: "Valorant",
        communityIcon: "/images/valorant.jpg",
        bannerPic: "/images/bannerMinecraft.jpg",
        description: "Welcome to the ultimate Minecraft hub! Whether you're a redstone genius, a master builder, a hardcore survivor, or just starting out, this is the place for you. Share your epic builds, survival adventures, redstone creations, and favorite seeds. Ask for tips, discuss updates, and connect with fellow crafters. Let's build, explore, and survive together!",
        members: 25,
        posts: 9,
    },
    {
        communityId: 5,
        communityName: "Fortnite",
        communityIcon: "/images/fortnite.jpg",
        bannerPic: "/images/bannerMinecraft.jpg",
        description: "Welcome to the ultimate Minecraft hub! Whether you're a redstone genius, a master builder, a hardcore survivor, or just starting out, this is the place for you. Share your epic builds, survival adventures, redstone creations, and favorite seeds. Ask for tips, discuss updates, and connect with fellow crafters. Let's build, explore, and survive together!",
        members: 25,
        posts: 9,
    }
];

const posts = [
    {
        postId: 1,
        communityId: 1,
        posterName: "BuilderMia",
        profilePic: "/images/mia.jpg",
        timePosted: "1h ago",
        postTitle: "My Medieval Castle is Finally Complete!",
        postBody: "Just finished building my medieval castle! Took me three weeks, but totally worth it. What do you guys think?",
        postImage: "/images/castle.jpg",
        likes: 161,
        dislikes: 2,
        comments: 2,
    },
    {
        postId: 2,
        communityId: 1,
        posterName: "Steve",
        profilePic: "/images/steve.jpg",
        timePosted: "2h ago",
        postTitle: "Found a Woodland Mansion! Any Tips?",
        postBody: "Just found a Woodland Mansion in my survival world! Any tips before I go in?",
        postImage: null,
        likes: 161,
        dislikes: 2,
        comments: 2
    },
    {
        postId: 3,
        communityId: 1,
        posterName: "BuilderMia",
        profilePic: "/images/mia.jpg",
        timePosted: "4h ago",
        postTitle: "Creeper Blew Up My Base... AGAIN",
        postBody: "I think I might actually cry. My entire storage room? GONE. Any tips to prevent this from happening again?",
        postImage: "/images/blow.jpg",
        likes: 161,
        dislikes: 2,
        comments: 2
    }
];

const comments = [
    {
        commentId: 1,
        postId: 1,
        parentId: null, //if reply to another comment
        postOwner: "BuilderMia",
        posterName: "MineMaster_22",
        profilePic: "/images/mod.jpg",
        commentContent: "You should add a hidden dungeon underneath!",
        timePosted: "10m ago",
        likes: 161,
        dislikes: 2,
        commentCount: 1,
    },
    {
        commentId: 2,
        postId: 1,
        parentId: 1,
        postOwner: "BuilderMia",
        posterName: "BuilderMia",
        profilePic: "/images/mia.jpg",
        commentContent: "Ooh that's a great idea!",
        timePosted: "4m ago",
        likes: 161,
        dislikes: 2,
        commentCount: 1,
    },
    {
        commentId: 3,
        postId: 1,
        parentId: null,
        postOwner: "BuilderMia",
        posterName: "Steve",
        profilePic: "/images/steve.jpg",
        commentContent: "That looks insane! How many blocks did you use?",
        timePosted: "30m ago",
        likes: 161,
        dislikes: 2,
        commentCount: 1,
    },
    {
        commentId: 4,
        postId: 1,
        parentId: 3,
        postOwner: "BuilderMia",
        posterName: "BuilderMia",
        profilePic: "/images/mia.jpg",
        commentContent: "Thank you! I used like 50,000 blocks.",
        timePosted: "10m ago",
        likes: 161,
        dislikes: 2,
        commentCount: 1,
    },
    {
        commentId: 5,
        postId: 1,
        parentId: 4,
        postOwner: "BuilderMia",
        posterName: "Steve",
        profilePic: "/images/steve.jpg",
        commentContent: "That's so cool! Maybe we can play sometime? :>",
        timePosted: "2m ago",
        likes: 161,
        dislikes: 2,
        commentCount: 1,
    }
];

const profiles = [
    {
        profileId:1,
        profilePic: "/images/mia.jpg",
        bannerPic: "/images/bannerMia.jpg",
        profileName: "BuilderMia",
        bio: "Passionate Minecraft builder who loves creating everything from cozy cottages to massive castles! Always experimenting with different styles, from medieval to modern. If you need building tips or design inspiration, I'm happy to help!",
        followers: 10,
        posts: 2,
        comments: 5
    },
    {
        profileId:2,
        profilePic: "/images/steve.jpg",
        bannerPic: "/images/bannerSteve.jpg",
        profileName: "Steve",
        bio: "Adventurer at heart, always searching for new biomes, rare structures, and hidden secrets in Minecraft. Whether it's conquering Woodland Mansions, raiding End Cities, or mapping out the Overworld, I'm always on the move. Got a cool seed? Share it with me!",
        followers: 10,
        posts: 5,
        comments: 5
    }
];

///////////////////////// ROUTES //////////////////////////////

mongo.initializeDB();
mongo.insertSampleForum();
mongo.insertSampleUser();
mongo.insertSamplePosts();

server.get("/", async function(req, resp){
    resp.render("home",{
        layout: "index",
        title: "Home Page",
        pageStyle: "home",
        pageScripts: ["account", "sortPosts", "likePosts", "login"],
        user: user,
        myCommunities: myCommunities,
        communities: communities,
        posts: posts
    });
});

server.get("/tester", async function(req, resp){
    resp.render("tester",{
        layout: "tester",
        title: "Tester",
    });
});


server.get("/forum/:forumName", async (req, resp) => {
    try {
        const decodedForumName = decodeURIComponent(req.params.forumName);

        const forum = await mongo.getForumByName(decodedForumName);

        // if (!forum) {
        //     return resp.status(404).render("notFound", {
        //         layout: "index",
        //         title: "Forum Not Found",
        //         message: `No forum found with the name "${decodedForumName}".`
        //     });
        // }

        resp.render("forum", {
            layout: "forumLayout",
            title: forum.name,
            forumName: forum.name,
            description: forum.description,
            forumImage: forum.forumImage,
            bannerImage: forum.bannerImage,
            createdAt: forum.createdAt.toDateString(),
            membersCount: forum.membersCount,
            postsCount: forum.postsCount
        });

    } catch (error) {
        console.error("Error fetching forum: ", error);
        // resp.status(500).render("error", {
        //     layout: "index",
        //     title: "Error",
        //     message: "An error occurred while loading the forum."
        // });
    }
});

server.get("/viewPost/:postId", function(req, resp){
    const postId = parseInt(req.params.postId);
    const post = posts.find(p => p.postId === postId);

    resp.render("viewPost",{
        layout: "index",
        title: "View Post Page",
        pageStyle: "viewpost",
        pageScripts: ["account", "likePosts", "viewPost", "login"],
        user: user,
        myCommunities: myCommunities,
        communities: communities,
        post: post,
        comments: comments.filter(c => c.postId === postId)
    });
});

server.get("/viewCommunity/:communityName", function(req, resp){
    const communityName = req.params.communityName;
    const community = communities.find(c => c.communityName === communityName);

    resp.render("viewCommunity",{
        layout: "index",
        title: "View Community Page",
        pageStyle: "viewcommunity",
        pageScripts: ["account", "sortPosts", "likePosts", "viewOptions", "viewCommunity", "login"],
        user: user,
        myCommunities: myCommunities,
        communities: communities,
        community: community,
        posts: posts.filter(p => p.communityId === community.communityId)
    });
});

server.get("/viewProfile/:profileName", function(req, resp){
    const profileName = req.params.profileName;
    const profile = profiles.find(p => p.profileName === profileName);

    resp.render("viewProfile",{
        layout: "index",
        title: "View Profile Page",
        pageStyle: "viewprofile",
        pageScripts: ["account", "sortPosts", "likePosts", "viewOptions", "viewProfile", "login"],
        user: user,
        myCommunities: myCommunities,
        communities: communities,
        profile: profile,
        posts: posts.filter(p => p.posterName === profileName),
        comments: comments.filter(c => c.posterName === profileName)
    });
});

server.get("/editPost/:postId", function(req, resp){
    const postId = parseInt(req.params.postId);
    const post = posts.find(p => p.postId === postId);

    resp.render("editPost",{
        layout: "index",
        title: "Edit Post Page",
        pageStyle: "createpost",
        pageScripts: ["account", "likePosts", "sortPosts"],
        myCommunities: myCommunities,
        communities: communities,
        user: user,
        post: post,
        community: communities.find(c => c.communityId === post.communityId)
    });
});

server.get("/editProfile/:profileName", function(req, resp){
    const profileName = req.params.profileName;
    const profile = profiles.find(p => p.profileName === profileName);

    resp.render("editProfile",{
        layout: "index",
        title: "Edit Profile Page",
        pageStyle: "editprofile",
        pageScripts: ["account", "likePosts", "sortPosts"],
        myCommunities: myCommunities,
        communities: communities,
        user: user,
        profile: profile
    });
});

server.get("/createPost/:communityName?", function(req, resp){
    const communityName = req.params.communityName;
    const community = communities.find(c => c.communityName === communityName);

    resp.render("createPost",{
        layout: "index",
        title: "Create Post Page",
        pageStyle: "createpost",
        pageScripts: ["account", "sortPosts", "likePosts"],
        myCommunities: myCommunities,
        communities: communities,
        user: user,
        community: community
    });
});

const port = process.env.PORT | 3000;
server.listen(port, function(){
    console.log("Listening at port "+port);
});

///////////////////////////// FORUM INTERACTIONS ///////////////////////////////

server.get("/api/get-forums", async (req, res) => {
    try {
        const forums = await mongo.getForums();
        res.json(forums);
        // console.log("Forums fetched: ", forums);

    } catch (error) {
        console.error("Error fetching forums: ", error);
        res.status(500).json({ error: "Error fetching forums" });
    }
});

server.get("/api/get-forum-by-id/:forumId", async (req, res) => {
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
        res.status(500).json({ error: "Error fetching forum" });
    }
});

server.get("/api/get-forum-by-name/:forumName", async (req, res) => {
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
        res.status(500).json({ error: "Error fetching forum" });
    }
});

server.patch("/api/update-forum/:forumId", async (req, res) => {
    try {
        const forumId = req.params.forumId;
        const updatedData = req.body;

        console.log("Updating forum: ", { forumId, updatedData });
        const result = await mongo.updateForum(forumId, updatedData);
        console.log("Update result: ", result);

        if (result) {
            res.json({ message: result.message });
        } else {
            res.status(400).json({ error: result.error });
        }
    } catch (error) {
        res.status(500).json({ error: "Error updating forum" });
    }
});

server.put("/api/update-forums", async (req, res) => {
    try {
        console.log("Updating multiple forums: ", req.body.forums);
        const result = await mongo.updateForums(req.body.forums);
        console.log("Update multiple forums result: ", result);

        if (result.success) {
            res.json({ message: result.message });
        } else {
            res.status(500).json({ error: result.error });
        }
    } catch (error) {
        res.status(500).json({ error: "Error updating forums" });
    }
});

server.post("/api/add-forum", async (req, res) => {
    try {
        const forumData = req.body;

        console.log("Adding forum: ", forumData);
        const result = await mongo.addForum(forumData);
        console.log("Add forum result: ", result);

        if (result) {
            res.json({ message: "Forum added successfully" });
        } else {
            res.status(500).json({ error: "Error adding forum" });
        }
    } catch (error) {
        console.error("Error adding forum: ", error);
        res.status(500).json({ error: "Error adding forum" });
    }
});


server.delete("/api/delete-forum/:forumId", async (req, res) => {
    try {
        console.log("Deleting forum: ", req.params.forumId);
        const result = await mongo.deleteForum(req.params.forumId);
        console.log("Delete forum result: ", result);

        if (result.success) {
            res.json({ message: result.message });
        } else {
            res.status(500).json({ error: result.error });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting forum" });
    }
});

/////////////////////////// USER INTERACTIONS ///////////////////

server.get("/api/get-users", async (req, res) => {
    try {
        const users = await mongo.getUsers();
        res.json(users);
        // console.log("Users fetched: ", users);

    } catch (error) {
        console.error("Error fetching users: ", error);
        res.status(500).json({ error: "Error fetching users" });
    }
});

server.get("/api/get-user-by-id/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await mongo.getUserById(userId);

        console.log("Found user: ", user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user by ID: ", error);
        res.status(500).json({ error: "Error fetching user" });
    }
});

server.get("/api/get-user-by-name/:username", async (req, res) => {
    try {
        const username = req.params.username;

        const user = await mongo.getUserByName(username);

        console.log("Found user: ", user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user by name: ", error);
        res.status(500).json({ error: "Error fetching user" });
    }
});


server.patch("/api/update-user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedData = req.body;

        console.log("Updating forum: ", { userId, updatedData });
        const result = await mongo.updateUser(userId, updatedData);
        console.log("Update result: ", result);

        if (result) {
            res.json({ message: result.message });
        } else {
            res.status(400).json({ error: result.error });
        }
    } catch (error) {
        res.status(500).json({ error: "Error updating forum" });
    }
});

server.put("/api/update-users", async (req, res) => {
    try {
        console.log("Updating multiple users: ", req.body.users);
        const result = await mongo.updateUsers(req.body.users);
        console.log("Update multiple users result: ", result);

        if (result.success) {
            res.json({ message: result.message });
        } else {
            res.status(500).json({ error: result.error });
        }
    } catch (error) {
        res.status(500).json({ error: "Error updating forums" });
    }
});

server.post("/api/add-user", async (req, res) => {
    try {
        const userData = req.body;

        console.log("Adding user: ", userData);
        const result = await mongo.addUser(userData);
        console.log("Add user result: ", result);

        if (result) {
            res.json({ message: "User added successfully" });
        } else {
            res.status(500).json({ error: "Error adding user" });
        }
    } catch (error) {
        console.error("Error adding user: ", error);
        res.status(500).json({ error: "Error adding user" });
    }
});

server.delete("/api/delete-user/:userId", async (req, res) => {
    try {
        console.log("Deleting user: ", req.params.userId);
        const result = await mongo.deleteUser(req.params.userId);
        console.log("Delete user result: ", result);

        if (result.success) {
            res.json({ message: result.message });
        } else {
            res.status(500).json({ error: result.error });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
    }
});

//////////////////// ACCOUNT INTERACTIONS /////////////////
server.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
    
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

        res.json({ success: true, message: "Login successful", user });
    } catch (error) {
        console.error("Error logging in: ", error);
        res.status(500).json({ error: "Error logging in" });
    }
});

// NOTE SESSIONS ARE BEING CHECKED IN HEADERS, check tester.hbs in layouts

server.get("/api/session", (req, res) => {
    if (req.session.user) {
        res.json({ success: true, user: req.session.user });
    } else {
        res.json({ success: false, message: "No active session" });
    }
});

server.post("/api/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            return res.status(500).json({ success: false, error: "Error logging out" });
        }
        res.json({ success: true, message: "Logged out successfully" });
    });
});

server.patch("/api/toggle-forum-join", async (req, res) => {
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
        res.status(500).json({ success: false, error: "Toggling error" });
    }

});

server.patch("/api/toggle-user-follow", async (req, res) => {
    try {
        const {userId, targetId} = req.body;

        console.log("toggling follower", userId, targetId);

        const result = await mongo.toggleUserFollow(userId, targetId);
    
        if (result.success){
            res.json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error){
        console.error("Error toggling: ", error);
        res.status(500).json({ success: false, error: "Toggling error" });
    }

});

/////////////////////////// POST INTERACTIONS ////////////
server.get("/api/get-posts-by-forum/:forumId", async (req, res) => {
    try {
        const forumId = req.params.forumId;
        const posts = await mongo.getPostsByForumId(forumId);

        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts: ", error);
        res.status(500).json({ error: "Error fetching posts" });
    }
}) ;