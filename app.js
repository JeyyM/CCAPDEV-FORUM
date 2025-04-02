const express = require("express");
const mongo = require("./model/dbFunctions");
const session = require("express-session");
const bodyParser = require("body-parser");

const MongoStore = require("connect-mongo");
require("dotenv").config();
mongo.initializeDB();


const fs = require("fs");
const path = require("path");

const server = express();

//controllers
const userController = require('./controller/userController');
const forumController = require('./controller/forumController');
const postController = require('./controller/postController');
const commentController = require('./controller/commentController');
const searchController = require('./controller/searchController');

// server.set("controller", path.join(__dirname, "controller"));
// server.set("model", path.join(__dirname, "model"));
// server.set("public", path.join(__dirname, "public"));
server.set("views", path.join(__dirname, "views"));
server.use(express.static(path.join(__dirname, "public")));

// server.use(session({
//     secret: "fuckingpassword",
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//         mongoUrl: process.env.MONGODB_URI,
//         collectionName: "sessions"
//     }),
//     cookie: {
//         secure: process.env.NODE_ENV === "production", 
//         httpOnly: true
//     }
// }));

server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI, 
        collectionName: "sessions"
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production', 
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, 
    }
}));


server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const handlebars = require('express-handlebars');
server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
        isEqual: (x, y) => x == y,
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
// let localUser = null;
// let communities;
// let myCommunities;

///////////////////////// ROUTES //////////////////////////////

mongo.initializeDB();
mongo.insertSampleForum();
mongo.insertSampleUser();
mongo.insertSamplePosts();

server.get("/tester", async function(req, resp){
    resp.render("tester",{
        layout: "tester",
        title: "Tester",
    });
});

server.get("/", async function (req, resp) {
    let posts;
    let currentUser;
    let allCommunities = await mongo.getForums("name", 1, 99, 0);

    let followedCommunities = [];
    
    if (req.session.user){
        currentUser = await mongo.getUserById(req.session.user.id);
        followedCommunities = allCommunities.filter(c =>
            currentUser.joinedForums.includes(c._id.toString())
        );
    }


    if (currentUser == null) {
        posts = await mongo.getPostsByForumIds("all", "new", 1, 10, 0);
    } else {
        posts = await mongo.getPostsByForumIds(currentUser.joinedForums, "new", 1, 10, 0);
    }

    resp.render("home",{
        layout: "index",
        title: "Home Page",
        pageStyle: "home",
        pageScripts: ["account", "sortPosts", "likePosts", "home", "search"],
        user: currentUser,
        myCommunities: followedCommunities,
        communities: allCommunities,
        posts: posts,
        showCommunity: true
    });
});

server.get("/viewPost/:postId", async function(req, resp){
    let currentUser;
    let allCommunities = await mongo.getForums("name", 1, 99, 0);
    let followedCommunities = [];

    if (req.session.user){
        currentUser = await mongo.getUserById(req.session.user.id);
        followedCommunities = allCommunities.filter(c =>
            currentUser.joinedForums.includes(c._id.toString())
        );
    }

    const postId = req.params.postId;
    let posts = await mongo.getPosts();
    const post = posts.find(p => p._id.toString() === postId.toString());

    /*
    if (currentUser == null) {
        posts = await mongo.getPostsByForumIds("all", "new", 1, 10, 0);
    } else {
        posts = await mongo.getPostsByForumIds(currentUser.joinedForums, "new", 1, 10, 0);
    }
    */

    const comments = await mongo.getCommentsByPostId(post._id);
    console.log(comments);

    resp.render("viewPost",{
        layout: "index",
        title: "View Post Page",
        pageStyle: "viewpost",
        pageScripts: ["account", "likePosts", "viewPost", "textarea", "search"],
        user: currentUser,
        myCommunities: followedCommunities,
        communities: allCommunities,
        post: post,
        comments: comments
    });
});

server.get("/viewCommunity/:communityName", async function(req, resp){
    let currentUser;
    let allCommunities = await mongo.getForums("name", 1, 99, 0);
    let followedCommunities = [];

    if (req.session.user){
        currentUser = await mongo.getUserById(req.session.user.id);
        followedCommunities = allCommunities.filter(c =>
            currentUser.joinedForums.includes(c._id.toString())
        );
    }

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
    let admin = null;

    if (currentUser) {
        joinedCommunity = currentUser.joinedForums.some(c => c === communityDB._id.toString());
        admin = community.admins.some(a => a === currentUser._id.toString());
    }

    resp.render("viewCommunity",{
        layout: "index",
        title: "View Community Page",
        pageStyle: "viewcommunity",
        pageScripts: ["account", "sortPosts", "likePosts", "viewOptions", "viewCommunity", "search"],
        user: currentUser,
        myCommunities: followedCommunities,
        communities: allCommunities,
        community: community,
        admin: admin,
        joinedCommunity: joinedCommunity,
        posts: postList
    });
});

server.get("/viewProfile/:profileName/:option?", async function(req, resp){
    const profileName = req.params.profileName;
    const option = req.params.option;

    let currentUser;
    let allCommunities = await mongo.getForums("name", 1, 99, 0);
    let followedCommunities = [];
    const profileDB = await mongo.getUserByName(profileName);

    if (req.session.user){
        currentUser = await mongo.getUserById(req.session.user.id);
        followedCommunities = allCommunities.filter(c =>
            currentUser.joinedForums.includes(c._id.toString())
        );
    }

    const users = await mongo.getUsers("createdAt", -1, 99, 0);
    const profile = users.find(u => u.username === profileName);

    // modify with the proper sort system

    // ID, sortBy, order, limit, skip, type ("all/post/comment")
    let activitiesList = await mongo.getUserActivity(profileDB._id.toString(), "createdAt", -1, 50, 0, "all");

    if (option == "Posts") {
        for (let i = 0; i < activitiesList.length; i++) {
            if (activitiesList[i].type == "comment") {
                activitiesList.splice(i, 1);
                i--;
            }
        }
    }
    else if (option == "Comments") {
        for (let i = 0; i < activitiesList.length; i++) {
            if (activitiesList[i].type == "post") {
                activitiesList.splice(i, 1);
                i--;
            }
        }
    }

    let followedUser = null;

    if (currentUser) {
        followedUser = currentUser.following.some(c => c === profileDB._id.toString());
    }

    console.log("User below");
    console.log(currentUser);

    resp.render("viewProfile",{
        layout: "index",
        title: "View Profile Page",
        pageStyle: "viewprofile",
        pageScripts: ["account", "sortPosts", "likePosts", "viewOptions", "viewProfile", "search"],
        user: currentUser,
        myCommunities: followedCommunities,
        communities: allCommunities,
        followedUser: followedUser,
        profile: profile,
        posts: activitiesList,
        showCommunity: true
    });
});

server.get("/editPost/:postId", async function(req, resp){
    let currentUser;
    let followedCommunities = [];

    const postId = req.params.postId;
    const posts = await mongo.getPosts();
    const post = posts.find(p => p._id.toString() === postId.toString());

    const communityList = await mongo.getForums("name", 1, 99, 0);
    const community = communityList.find(c => c._id.toString() === post.forumId.toString());

    if (req.session.user){
        currentUser = await mongo.getUserById(req.session.user.id);
        followedCommunities = communityList.filter(c =>
            currentUser.joinedForums.includes(c._id.toString())
        );
    }    

    resp.render("editPost",{
        layout: "index",
        title: "Edit Post Page",
        pageStyle: "createpost",
        pageScripts: ["account", "likePosts", "sortPosts", "editPost", "textarea", "search"],
        myCommunities: followedCommunities,
        communities: communityList,
        user: currentUser,
        post: post,
        community: community
    });
});

server.get("/editProfile", async function(req, resp){
    let currentUser;
    let allCommunities = await mongo.getForums("name", 1, 99, 0);
    let followedCommunities = [];
    let alertMessage;

    if (req.session.user){
        currentUser = await mongo.getUserById(req.session.user.id);
        followedCommunities = allCommunities.filter(c =>
            currentUser.joinedForums.includes(c._id.toString())
        );
    } else {
        alertMessage = "You are currently not logged in, returning home.";
    }

    resp.render("editProfile",{
        layout: "index",
        title: "Edit Profile Page",
        pageStyle: "editprofile",
        pageScripts: ["account", "likePosts", "sortPosts", "editProfile", "textarea", "search"],
        myCommunities: followedCommunities,
        communities: allCommunities,
        user: currentUser,
        profile: currentUser,
        alert: alertMessage
    });
});

server.get("/createPost/:communityName?", async function(req, resp){
    let currentUser;
    let followedCommunities = [];

    const communityName = req.params.communityName;

    const communityList = await mongo.getForums("name", 1, 99, 0);
    const community = communityList.find(c => c.name === communityName);

    if (req.session.user){
        currentUser = await mongo.getUserById(req.session.user.id);
        followedCommunities = communityList.filter(c =>
            currentUser.joinedForums.includes(c._id.toString())
        );
    }

    resp.render("createPost",{
        layout: "index",
        title: "Create Post Page",
        pageStyle: "createpost",
        pageScripts: ["account", "sortPosts", "likePosts", "createPost", "textarea", "search"],
        myCommunities: followedCommunities,
        communities: communityList,
        user: currentUser,
        community: community
    });
});

server.get("/createForum/", async function(req, resp){
    let currentUser;
    let followedCommunities = [];

    const communityList = await mongo.getForums("name", 1, 99, 0);

    if (req.session.user){
        currentUser = await mongo.getUserById(req.session.user.id);
        followedCommunities = communityList.filter(c =>
            currentUser.joinedForums.includes(c._id.toString())
        );
    }

    resp.render("createForum",{
        layout: "index",
        title: "Create Post Page",
        pageStyle: "createpost",
        pageScripts: ["account", "sortPosts", "likePosts", "createForum", "textarea", "search"],
        myCommunities: followedCommunities,
        communities: communityList,
        user: currentUser,
    });
});

server.get("/editForum/:communityName?", async function(req, resp){
    let currentUser;
    let followedCommunities = [];

    const communityList = await mongo.getForums("name", 1, 99, 0);

    const communityName = req.params.communityName;
    const community = communityList.find(c => c.name === communityName);

    if (req.session.user) {
        currentUser = await mongo.getUserById(req.session.user.id);
        followedCommunities = communityList.filter(c =>
            currentUser.joinedForums.includes(c._id.toString())
        );
    }

    let admin = null;

    if (currentUser) {
        admin = community.admins.some(a => a === currentUser._id.toString());
    }

    if (admin) {
        resp.render("editForum",{
            layout: "index",
            title: "Create Post Page",
            pageStyle: "createpost",
            pageScripts: ["account", "sortPosts", "likePosts", "editForum", "textarea", "search"],
            myCommunities: followedCommunities,
            communities: communityList,
            user: currentUser,
            community: community
        });
    }
    else {
        resp.render("error",{
            layout: "index",
            title: "Error",
            pageStyle: "home",
            alert: "You are currently not logged in, returning home."
        })
    }
});

server.get("/about", async function(req, resp) {
    let currentUser;
    let allCommunities = await mongo.getForums("name", 1, 99, 0);
    let followedCommunities = [];

    if (req.session.user){
        currentUser = await mongo.getUserById(req.session.user.id);
        followedCommunities = allCommunities.filter(c =>
            currentUser.joinedForums.includes(c._id.toString())
        );
    }

    resp.render("about", {
        layout: "index",
        title: "About Page",
        pageStyle: "about",
        pageScripts: ["account"],
        myCommunities: followedCommunities,
        communities: allCommunities,
        user: currentUser
    })
})


 const port = process.env.PORT || 3000;
 server.listen(port, function(){
     console.log("Listening at port "+port);
});
// for vercel:
//module.exports = server;

// For Updating Global Variables
server.post("/update/userLogin", function(req, resp){
    // localUser = req.body.user;

    // fetchMyCommunities();
    resp.json({ success: true, message: "User login updated" });
})

server.post("/update/userGeneral", function(req, resp){
    // localUser = req.body.user;
    // fetchMyCommunities();
    resp.json({ success: true, message: "User updated" });
});

server.post("/update/userLogout", function(req, resp){
    // localUser = null;
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