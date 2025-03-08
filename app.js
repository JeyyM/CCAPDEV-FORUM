const express = require("express");
const mongo = require("./model/dbFunctions");
const session = require("express-session");
const bodyParser = require("body-parser");

const fs = require("fs");
const path = require("path");

const server = express();

//controllers
const userController = require('./controller/userController');
const forumController = require('./controller/forumController');
const postController = require('./controller/postController');
const commentController = require('./controller/commentController');

server.use(session({
    secret: "fuckingpassword",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true
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
        isNull: (x) => x === null,
        json: function (body) {
            return JSON.stringify(body);
        }
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

//register controllers under /api
server.use("/api", userController);
server.use("/api", forumController);
server.use("/api", postController);
server.use("/api", commentController);

//////////////////////////////// Placeholders ///////////////////////////////////////////////
/*
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
*/
let localUser = null;

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
        communityName: "CSGO",
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

/*
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
*/

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
    console.log("User: " + localUser);
    const posts = await mongo.getPosts();

    resp.render("home",{
        layout: "index",
        title: "Home Page",
        pageStyle: "home",
        pageScripts: ["account", "sortPosts", "likePosts", "home"],
        user: localUser,
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
        const posts = await mongo.getPostsByForumId(forum._id);

        const postUsers = [];

        for (const post of posts){
            const user = await mongo.getUserById(post.authorId);
            postUsers.push(user);
        }

        console.log("USERS", postUsers);

        resp.render("forum", {
            layout: "forumLayout",
            forumData: forum,
            postData: posts,
            userData: postUsers
        });

    } catch (error) {
        console.error("Error fetching forum: ", error);
    }
});

server.get("/viewPost/:postId", async function(req, resp){
    const postId = req.params.postId;
    const posts = await mongo.getPosts();
    const post = posts.find(p => p._id.toString() === postId.toString());

    const comments = await mongo.getCommentsByPostId(post._id);
    // const comments = await commentsResponse.json();
    console.log(comments);

    resp.render("viewPost",{
        layout: "index",
        title: "View Post Page",
        pageStyle: "viewpost",
        pageScripts: ["account", "likePosts", "viewPost", "login", "textarea"],
        user: localUser,
        myCommunities: myCommunities,
        communities: communities,
        post: post,
        comments: comments
    });
});

server.get("/viewCommunity/:communityName", async function(req, resp){
    const communityName = req.params.communityName;

    const communityList = await mongo.getForums();
    const community = communityList.find(c => c.name === communityName);

    const communityDB = await mongo.getForumByName(communityName);

    const posts = await mongo.getPosts();
    const postList = [];

    console.log(community);

    posts.forEach(function (post) {
        if (post.forumId.toString() == community._id.toString()) {
            postList.push(post);
        }
    })

    let joinedCommunity = null;

    if (localUser) {
        console.log("Joined Forums: " + localUser.joinedForums);
        joinedCommunity = localUser.joinedForums.some(c => c === communityDB._id.toString());
    }
    
    console.log("Joined community: " + joinedCommunity);

    resp.render("viewCommunity",{
        layout: "index",
        title: "View Community Page",
        pageStyle: "viewcommunity",
        pageScripts: ["account", "sortPosts", "likePosts", "viewOptions", "viewCommunity", "login"],
        user: localUser,
        myCommunities: myCommunities,
        communities: communities,
        community: community,
        joinedCommunity: joinedCommunity,
        posts: postList
    });
});

server.get("/viewProfile/:profileName", async function(req, resp){
    const profileName = req.params.profileName;

    const users = await mongo.getUsers();
    const profile = users.find(u => u.username === profileName);
    console.log(profile._id);

    const posts = await mongo.getPosts();
    const postList = [];
    // console.log(posts);
    
    posts.forEach(function (post) {
        if (post.authorId.toString() == profile._id.toString()) {
            postList.push(post);
        }
    })

    resp.render("viewProfile",{
        layout: "index",
        title: "View Profile Page",
        pageStyle: "viewprofile",
        pageScripts: ["account", "sortPosts", "likePosts", "viewOptions", "viewProfile", "login"],
        user: localUser,
        myCommunities: myCommunities,
        communities: communities,
        profile: profile,
        posts: postList,
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
        user: localUser,
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
        user: localUser,
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
        user: localUser,
        community: community
    });
});

const port = process.env.PORT | 3000;
server.listen(port, function(){
    console.log("Listening at port "+port);
});

// For Testing Stuff

server.post("/update/userLogin", function(req, resp){
    console.log(req.body.user);

    localUser = req.body.user;
    resp.json({ success: true, message: "User login updated" });
})

server.post("/update/userGeneral", function(req, resp){
    console.log(req.body.user);

    localUser = req.body.user;
    resp.json({ success: true, message: "User updated" });
});

server.post("/update/userLogout", function(req, resp){
    console.log("User Log Out");
    localUser = null;
    resp.json({ success: true, message: "User logout updated" });
})

server.get("/info/get-forum-info-by-name/:forumName", async function(req, resp) {
    const forumName = req.params.forumName;

    const users = await mongo.getUsers();
    const forum = await mongo.getForumByName(forumName);
    const userList = [];

    users.forEach(function (user) {
        if (user.joinedForums.some(c => c === forum._id.toString())) {
            userList.push(user);
        }
    })

    resp.send(userList);
});

///////////////////////////// FORUM INTERACTIONS ///////////////////////////////

// server.get("/api/get-forums", async (req, res) => {
//     try {
//         const forums = await mongo.getForums();
//         res.json(forums);
//         // console.log("Forums fetched: ", forums);

//     } catch (error) {
//         console.error("Error fetching forums: ", error);
//         res.status(500).json({ message: "Error fetching forums" });
//     }
// });

// server.get("/api/get-forum-by-id/:forumId", async (req, res) => {
//     try {
//         const forumId = req.params.forumId;

//         const forum = await mongo.getForumById(forumId);

//         // console.log("Found forum: ", forum);

//         if (!forum) {
//             return res.status(404).json({ message: "Forum not found" });
//         }

//         res.json(forum);
//     } catch (error) {
//         console.error("Error fetching forum by ID: ", error);
//         res.status(500).json({ message: "Error fetching forum" });
//     }
// });

// server.get("/api/get-forum-by-name/:forumName", async (req, res) => {
//     try {
//         const forumName = req.params.forumName;

//         const forum = await mongo.getForumByName(forumName);

//         // console.log("Found forum: ", forum);

//         if (!forum) {
//             return res.status(404).json({ message: "Forum not found" });
//         }

//         res.json(forum);
//     } catch (error) {
//         console.error("Error fetching forum by name: ", error);
//         res.status(500).json({ message: "Error fetching forum" });
//     }
// });

// server.patch("/api/update-forum/:forumId", async (req, res) => {
//     try {
//         const forumId = req.params.forumId;
//         const updatedData = req.body;

//         // console.log("Updating forum: ", { forumId, updatedData });
//         const result = await mongo.updateForum(forumId, updatedData);
//         // console.log("Update result: ", result);

//         if (result) {
//             res.json({ message: result.message });
//         } else {
//             res.status(400).json({ message: result.error });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error updating forum" });
//     }
// });

// server.put("/api/update-forums", async (req, res) => {
//     try {
//         // console.log("Updating multiple forums: ", req.body.forums);
//         const result = await mongo.updateForums(req.body.forums);
//         // console.log("Update multiple forums result: ", result);

//         if (result.success) {
//             res.json({ message: result.message });
//         } else {
//             res.status(500).json({ message: result.error });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error updating forums" });
//     }
// });

// server.post("/api/add-forum", async (req, res) => {
//     try {
//         const forumData = req.body;

//         // console.log("Adding forum: ", forumData);
//         const result = await mongo.addForum(forumData);
//         // console.log("Add forum result: ", result);

//         if (result) {
//             res.json({ message: "Forum added successfully" });
//         } else {
//             res.status(500).json({ message: "Error adding forum" });
//         }
//     } catch (error) {
//         console.error("Error adding forum: ", error);
//         res.status(500).json({ message: "Error adding forum" });
//     }
// });


// server.delete("/api/delete-forum/:forumId", async (req, res) => {
//     try {
//         // console.log("Deleting forum: ", req.params.forumId);
//         const result = await mongo.deleteForum(req.params.forumId);
//         // console.log("Delete forum result: ", result);

//         if (result.success) {
//             res.json({ message: result.message });
//         } else {
//             res.status(500).json({ message: result.error });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting forum" });
//     }
// });

// /////////////////////////// USER INTERACTIONS ///////////////////

// server.get("/api/get-users", async (req, res) => {
//     try {
//         const users = await mongo.getUsers();
//         res.json(users);
//         // console.log("Users fetched: ", users);

//     } catch (error) {
//         console.error("Error fetching users: ", error);
//         res.status(500).json({ message: "Error fetching users" });
//     }
// });

// server.get("/api/get-user-by-id/:userId", async (req, res) => {
//     try {
//         const userId = req.params.userId;

//         const user = await mongo.getUserById(userId);

//         // console.log("Found user: ", user);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.json(user);
//     } catch (error) {
//         console.error("Error fetching user by ID: ", error);
//         res.status(500).json({ message: "Error fetching user" });
//     }
// });

// server.get("/api/get-user-by-name/:username", async (req, res) => {
//     try {
//         const username = req.params.username;

//         const user = await mongo.getUserByName(username);

//         // console.log("Found user: ", user);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.json(user);
//     } catch (error) {
//         console.error("Error fetching user by name: ", error);
//         res.status(500).json({ message: "Error fetching user" });
//     }
// });


// server.patch("/api/update-user/:userId", async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const updatedData = req.body;

//         // console.log("Updating user: ", { userId, updatedData });
//         const result = await mongo.updateUser(userId, updatedData);
//         // console.log("Update result: ", result);

//         if (result) {
//             res.json({ message: result.message });
//         } else {
//             res.status(400).json({ message: result.error });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error updating user" });
//     }
// });

// server.put("/api/update-users", async (req, res) => {
//     try {
//         // console.log("Updating multiple users: ", req.body.users);
//         const result = await mongo.updateUsers(req.body.users);
//         // console.log("Update multiple users result: ", result);

//         if (result.success) {
//             res.json({ message: result.message });
//         } else {
//             res.status(500).json({ message: result.error });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error updating users" });
//     }
// });

// server.post("/api/add-user", async (req, res) => {
//     try {
//         const userData = req.body;

//         // console.log("Adding user: ", userData);
//         const result = await mongo.addUser(userData);
//         // console.log("Add user result: ", result);

//         if (result) {
//             res.json({ message: "User added successfully" });
//         } else {
//             res.status(500).json({ message: "Error adding user" });
//         }
//     } catch (error) {
//         console.error("Error adding user: ", error);
//         res.status(500).json({ message: "Error adding user" });
//     }
// });

// server.delete("/api/delete-user/:userId", async (req, res) => {
//     try {
//         // console.log("Deleting user: ", req.params.userId);
//         const result = await mongo.deleteUser(req.params.userId);
//         // console.log("Delete user result: ", result);

//         if (result.success) {
//             res.json({ message: result.message });
//         } else {
//             res.status(500).json({ message: result.error });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting user" });
//     }
// });

// //////////////////// ACCOUNT INTERACTIONS /////////////////
// server.post("/api/login", async (req, res) => {
//     try {
//         const { email, password, rememberMe } = req.body;
    
//         const user = await mongo.getUserByEmail(email);

//         if (!user) {
//             return res.status(404).json({ success: false, message: "Email not found" });
//         }

//         if (user.password !== password) {
//             return res.status(401).json({ success: false, message: "Wrong password" });
//         }

//         req.session.user = {
//             id: user._id,
//             username: user.username,
//             email: user.email,
//             // joinedForums: user.joinedForums,
//             // following: user.joinedForums
//         };

//         if (rememberMe) {
//             req.session.cookie.maxAge = 60 * 60 * 1000;
//         }

//         res.json({ success: true, message: "Login successful", user });
//     } catch (error) {
//         console.error("Error logging in: ", error);
//         res.status(500).json({ message: "Error logging in" });
//     }
// });

// // NOTE SESSIONS ARE BEING CHECKED IN HEADERS, check tester.hbs in layouts

// server.get("/api/session", (req, res) => {
//     if (req.session.user) {
//         res.json({ success: true, user: req.session.user });
//     } else {
//         res.json({ success: false, message: "No active session" });
//     }
// });

// server.post("/api/logout", (req, res) => {
//     req.session.destroy(error => {
//         if (error) {
//             return res.status(500).json({ success: false, message: "Error logging out" });
//         }
//         res.json({ success: true, message: "Logged out successfully" });
//     });
// });

// server.patch("/api/toggle-forum-join", async (req, res) => {
//     try {
//         const {userId, forumId} = req.body;

//         const result = await mongo.toggleForumJoin(userId, forumId);
    
//         if (result.success){
//             res.json(result);
//         } else {
//             res.status(400).json(result);
//         }
//     } catch (error){
//         console.error("Error toggling: ", error);
//         res.status(500).json({ success: false, message: "Toggling error" });
//     }

// });

// server.patch("/api/toggle-user-follow", async (req, res) => {
//     try {
//         const {userId, targetId} = req.body;

//         // console.log("toggling follower", userId, targetId);

//         const result = await mongo.toggleUserFollow(userId, targetId);
    
//         if (result.success){
//             res.json(result);
//         } else {
//             res.status(400).json(result);
//         }
//     } catch (error){
//         console.error("Error toggling: ", error);
//         res.status(500).json({ success: false, message: "Toggling error" });
//     }

// });

// /////////////////////////// POST INTERACTIONS ////////////
// server.get("/api/get-posts-by-forum/:forumId", async (req, res) => {
//     try {
//         const forumId = req.params.forumId;
//         const posts = await mongo.getPostsByForumId(forumId);

//         // .limit()
//         // .sortBy()

//         res.json(posts);
//     } catch (error) {
//         console.error("Error fetching posts: ", error);
//         res.status(500).json({ message: "Error fetching posts" });
//     }
// });

// server.put("/api/update-posts", async (req, res) => {
//     try {
//         // console.log("Updating multiple posts: ", req.body.posts);
//         const result = await mongo.updatePosts(req.body.posts);
//         // console.log("Update multiple posts result: ", result);

//         if (result.success) {
//             res.json({ message: result.message });
//         } else {
//             res.status(500).json({ message: result.error });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error updating post" });
//     }
// });

// server.patch("/api/update-post/:postId", async (req, res) => {
//     try {
//         const postId = req.params.postId;
//         const updatedData = req.body;

//         // console.log("Updating post: ", { postId, updatedData });
//         const result = await mongo.updatePost(postId, updatedData);
//         // console.log("Update result: ", result);

//         if (result) {
//             res.json({ message: result.message });
//         } else {
//             res.status(400).json({ message: result.error });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error updating post" });
//     }
// });

// server.post("/api/add-post", async (req, res) => {
//     try {
//         const postData = req.body;

//         // console.log("Adding post: ", postData);
//         const result = await mongo.addPost(postData);
//         // console.log("Add forum result: ", result);

//         if (result) {
//             res.json({ message: "Post added successfully" });
//         } else {
//             res.status(500).json({ message: "Error adding post" });
//         }
//     } catch (error) {
//         console.error("Error adding post: ", error);
//         res.status(500).json({ message: "Error adding post" });
//     }
// });

// server.delete("/api/delete-post/:postId", async (req, res) => {
//     try {
//         // console.log("Deleting post: ", req.params.postId);
//         const result = await mongo.deletePost(req.params.postId);
//         // console.log("Delete post result: ", result);

//         if (result.success) {
//             res.json({ message: result.message });
//         } else {
//             res.status(500).json({ message: result.error });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting user" });
//     }
// });

// server.patch("/api/toggle-vote", async (req, res) => {
//     try {
//         const { userId, postId, voteValue } = req.body;

//         // console.log("Toggling vote:", userId, postId, voteValue);

//         const result = await mongo.toggleVote(userId, postId, voteValue);

//         if (result.success) {
//             res.json(result);
//         } else {
//             res.status(400).json(result);
//         }
//     } catch (error) {
//         console.error("Error toggling vote: ", error);
//         res.status(500).json({ success: false, message: "Toggling vote error" });
//     }
// });

// /////////////////////////// COMMENT INTERACTIONS ////////////
// server.get("/api/get-comments-by-post/:postId", async (req, res) => {
//     try {
//         const postId = req.params.postId;
//         const comments = await mongo.getCommentsByPostId(postId);

//         res.json(comments);
//     } catch (error) {
//         console.error("Error fetching comments: ", error);
//         res.status(500).json({ message: "Error fetching comments" });
//     }
// });

// server.patch("/api/update-comment/:commentId", async (req, res) => {
//     try {
//         const commentId = req.params.commentId;
//         const updatedData = req.body;

//         // console.log("Updating comment: ", { commentId, updatedData });
//         const result = await mongo.updateComment(commentId, updatedData);
//         // console.log("Update result: ", result);

//         if (result) {
//             res.json({ message: result.message });
//         } else {
//             res.status(400).json({ message: result.error });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error updating comment" });
//     }
// });

// server.post("/api/add-comment", async (req, res) => {
//     try {
//         const commentData = req.body;

//         // console.log("Adding comment: ", commentData);
//         const result = await mongo.addComment(commentData);
//         // console.log("Add forum result: ", result);

//         if (result) {
//             res.json({ message: "Comment added successfully" });
//         } else {
//             res.status(500).json({ message: "Error adding comment" });
//         }
//     } catch (error) {
//         console.error("Error adding comment: ", error);
//         res.status(500).json({ message: "Error adding comment" });
//     }
// });

// server.patch("/api/toggle-comment-vote", async (req, res) => {
//     try {
//         const { userId, commentId, voteValue } = req.body;

//         // console.log("Toggling vote:", userId, commentId, voteValue);

//         const result = await mongo.toggleCommentVote(userId, commentId, voteValue);

//         if (result.success) {
//             res.json(result);
//         } else {
//             res.status(400).json(result);
//         }
//     } catch (error) {
//         console.error("Error toggling vote: ", error);
//         res.status(500).json({ success: false, message: "Toggling vote error" });
//     }
// });

// server.delete("/api/delete-comment/:commentId", async (req, res) => {
//     try {
//         // console.log("Deleting comment: ", req.params.commentId);
//         const result = await mongo.deleteComment(req.params.commentId);
//         // console.log("Delete comment result: ", result);

//         if (result.success) {
//             res.json({ message: result.message });
//         } else {
//             res.status(500).json({ message: result.error });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting comment" });
//     }
// });