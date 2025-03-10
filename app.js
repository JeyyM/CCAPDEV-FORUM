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
        },
        formatDate: function (date) {
            return new Date(date).toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });
        },
        isDateEqual: function (date1, date2) {
            return new Date(date1).getTime() === new Date(date2).getTime();
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

server.get("/", async function (req, resp) {
    let posts;

    await fetchCommunities();

    if (localUser == null) {
        posts = await mongo.getPostsByForumIds("all", "new", 1, 10, 0);
    }

    else {
        posts = await mongo.getPostsByForumIds(localUser.joinedForums, "new", 1, 10, 0);
    }

    resp.render("home",{
        layout: "index",
        title: "Home Page",
        pageStyle: "home",
        pageScripts: ["account", "sortPosts", "likePosts", "home"],
        user: localUser,
        myCommunities: myCommunities,
        communities: communities,
        posts: posts,
        showCommunity: true
    });
});

server.get("/viewPost/:postId", async function(req, resp){
    const postId = req.params.postId;
    const posts = await mongo.getPosts();
    const post = posts.find(p => p._id.toString() === postId.toString());

    const comments = await mongo.getCommentsByPostId(post._id);

    resp.render("viewPost",{
        layout: "index",
        title: "View Post Page",
        pageStyle: "viewpost",
        pageScripts: ["account", "likePosts", "viewPost", "textarea"],
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

    posts.forEach(function (post) {
        if (post.forumId.toString() == community._id.toString()) {
            postList.push(post);
        }
    })

    let joinedCommunity = null;

    if (localUser) {
        joinedCommunity = localUser.joinedForums.some(c => c === communityDB._id.toString());
    }

    resp.render("viewCommunity",{
        layout: "index",
        title: "View Community Page",
        pageStyle: "viewcommunity",
        pageScripts: ["account", "sortPosts", "likePosts", "viewOptions", "viewCommunity"],
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

    const profileDB = await mongo.getUserByName(profileName);

    const posts = await mongo.getPosts("createdAt", -1, 99, 0);
    const postList = [];
    
    posts.forEach(function (post) {
        if (post.authorId.toString() == profile._id.toString()) {
            postList.push(post);
        }
    })

    let followedUser = null;

    if (localUser) {
        followedUser = localUser.following.some(c => c === profileDB._id.toString());
    }

    resp.render("viewProfile",{
        layout: "index",
        title: "View Profile Page",
        pageStyle: "viewprofile",
        pageScripts: ["account", "sortPosts", "likePosts", "viewOptions", "viewProfile"],
        user: localUser,
        myCommunities: myCommunities,
        communities: communities,
        profile: profile,
        followedUser: followedUser,
        posts: postList,
        showCommunity: true
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

// For Updating Global Variables

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

server.post("/update/userLogin", function(req, resp){
    localUser = req.body.user;
    fetchMyCommunities();
    resp.json({ success: true, message: "User login updated" });
})

server.post("/update/userGeneral", function(req, resp){
    localUser = req.body.user;
    fetchMyCommunities();
    resp.json({ success: true, message: "User updated" });
});

server.post("/update/userLogout", function(req, resp){
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