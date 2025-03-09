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
const searchController = require('./controller/searchController');

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
      },
      toString: function (value) {
        return String(value);
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
server.use("/api", searchController);

//////////////////////////////// Global Variables ///////////////////////////////////////////////
let localUser = null;
let communities;
let myCommunities;

///////////////////////// ROUTES //////////////////////////////

mongo.initializeDB();
mongo.insertSampleForum();
mongo.insertSampleUser();
mongo.insertSamplePosts();

server.get("/", async function(req, resp) {
    let posts;

    await fetchCommunities();
    console.log(communities);

    if (localUser == null) {
        posts = await mongo.getPostsByForumIds("all", "new", 1, 10, 0);
    }

    else {
        posts = await mongo.getPostsByForumIds(localUser.joinedForums, "new", 1, 10, 0);
        // console.log(posts);
    }

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

server.get("/viewPost/:postId", async function(req, resp){
    const postId = req.params.postId;
    const posts = await mongo.getPosts();
    const post = posts.find(p => p._id.toString() === postId.toString());

    const comments = await mongo.getCommentsByPostId(post._id);
    console.log(comments);

    if (localUser != null) {
        console.log(localUser);
    }

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

    const communityList = await mongo.getForums("createdAt", -1, 99, 0);
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

    console.log(postList);

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

    const users = await mongo.getUsers("createdAt", -1, 99, 0);
    const profile = users.find(u => u.username === profileName);
    console.log(profile._id);

    const profileDB = await mongo.getUserByName(profileName);

    const posts = await mongo.getPosts("createdAt", -1, 99, 0);
    const postList = [];
    // console.log(posts);
    
    posts.forEach(function (post) {
        if (post.authorId.toString() == profile._id.toString()) {
            postList.push(post);
        }
    })

    let followedUser = null;

    if (localUser) {
        console.log("Followed Users: " + localUser.following);
        followedUser = localUser.following.some(c => c === profileDB._id.toString());
    }
    
    console.log("Followed User: " + followedUser);

    resp.render("viewProfile",{
        layout: "index",
        title: "View Profile Page",
        pageStyle: "viewprofile",
        pageScripts: ["account", "sortPosts", "likePosts", "viewOptions", "viewProfile", "login"],
        user: localUser,
        myCommunities: myCommunities,
        communities: communities,
        profile: profile,
        followedUser: followedUser,
        posts: postList,
    });
});

server.get("/editPost/:postId", async function(req, resp){
    const postId = req.params.postId;
    const posts = await mongo.getPosts();
    const post = posts.find(p => p._id.toString() === postId.toString());

    const communityList = await mongo.getForums("name", 1, 99, 0);
    const community = communityList.find(c => c._id.toString() === post.forumId.toString());

    resp.render("editPost",{
        layout: "index",
        title: "Edit Post Page",
        pageStyle: "createpost",
        pageScripts: ["account", "likePosts", "sortPosts", "editPost", "textarea"],
        myCommunities: myCommunities,
        communities: communities,
        user: localUser,
        post: post,
        community: community
    });
});

server.get("/editProfile/:profileName", async function(req, resp){
    const profileName = req.params.profileName;
    const profile = await mongo.getUserByName(profileName);

    console.log(profile);

    resp.render("editProfile",{
        layout: "index",
        title: "Edit Profile Page",
        pageStyle: "editprofile",
        pageScripts: ["account", "likePosts", "sortPosts", "editProfile", "textarea"],
        myCommunities: myCommunities,
        communities: communities,
        user: localUser,
        profile: profile
    });
});

server.get("/createPost/:communityName?", async function(req, resp){
    const communityName = req.params.communityName;

    const communityList = await mongo.getForums("name", 1, 99, 0);
    const community = communityList.find(c => c.name === communityName);

    resp.render("createPost",{
        layout: "index",
        title: "Create Post Page",
        pageStyle: "createpost",
        pageScripts: ["account", "sortPosts", "likePosts", "createPost", "textarea"],
        myCommunities: myCommunities,
        communities: communityList,
        user: localUser,
        community: community
    });
});

server.get("/about", function(req, resp) {
    resp.render("about", {
        layout: "index",
        title: "About Page",
        pageStyle: "about",
        pageScripts: ["account"],
        myCommunities: myCommunities,
        communities: communities,
        user: localUser
    })
})

const port = process.env.PORT | 3000;
server.listen(port, function(){
    console.log("Listening at port "+port);
});

// For Testing Stuff

async function fetchCommunities() {
    communities = await mongo.getForums("name", 1, 99, 0);
}

async function fetchMyCommunities() {
    const joinedCommunities = [];

    localUser.joinedForums.forEach(function(community) {
        joinedCommunities.push(communities.find(c => c._id.toString() === community));
    });

    myCommunities = joinedCommunities.reverse();
}

fetchCommunities();

server.post("/update/userLogin", function(req, resp){
    console.log(req.body.user);

    localUser = req.body.user;
    fetchMyCommunities();
    resp.json({ success: true, message: "User login updated" });
})

server.post("/update/userGeneral", function(req, resp){
    console.log(req.body.user);

    localUser = req.body.user;
    fetchMyCommunities();
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