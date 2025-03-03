const express = require('express');
const server = express();
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

const handlebars = require('express-handlebars');
server.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
        isEqual: (x, y) => x === y,
        isNull: (x) => x === null 
    }
}));
server.set('view engine', 'hbs');
server.use(express.static('public'));

// place holder for data
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

server.get('/', function(req, resp){
    resp.render('home',{
        layout: 'index',
        title: 'Home Page',
        pageStyle: "home",
        pageScripts: ["account", "sortPosts", "likePosts", "login"],
        user: user,
        myCommunities: myCommunities,
        communities: communities,
        posts: posts
    });
});

server.get('/viewPost/:postId', function(req, resp){
    const postId = parseInt(req.params.postId);
    const post = posts.find(p => p.postId === postId);

    resp.render('viewPost',{
        layout: 'index',
        title: 'View Post Page',
        pageStyle: "viewpost",
        pageScripts: ["account", "likePosts", "viewPost", "login"],
        user: user,
        myCommunities: myCommunities,
        communities: communities,
        post: post,
        comments: comments.filter(c => c.postId === postId)
    });
});

server.get('/viewCommunity/:communityName', function(req, resp){
    const communityName = req.params.communityName;
    const community = communities.find(c => c.communityName === communityName);

    resp.render('viewCommunity',{
        layout: 'index',
        title: 'View Community Page',
        pageStyle: "viewcommunity",
        pageScripts: ["account", "sortPosts", "likePosts", "viewOptions", "viewCommunity", "login"],
        user: user,
        myCommunities: myCommunities,
        communities: communities,
        community: community,
        posts: posts.filter(p => p.communityId === community.communityId)
    });
});

server.get('/viewProfile/:profileName', function(req, resp){
    const profileName = req.params.profileName;
    const profile = profiles.find(p => p.profileName === profileName);

    resp.render('viewProfile',{
        layout: 'index',
        title: 'View Profile Page',
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

server.get('/editPost/:postId', function(req, resp){
    const postId = parseInt(req.params.postId);
    const post = posts.find(p => p.postId === postId);

    resp.render('editPost',{
        layout: 'index',
        title: 'Edit Post Page',
        pageStyle: "createpost",
        pageScripts: ["account", "likePosts", "sortPosts"],
        myCommunities: myCommunities,
        communities: communities,
        user: user,
        post: post,
        community: communities.find(c => c.communityId === post.communityId)
    });
});

server.get('/editProfile/:profileName', function(req, resp){
    const profileName = req.params.profileName;
    const profile = profiles.find(p => p.profileName === profileName);

    resp.render('editProfile',{
        layout: 'index',
        title: 'Edit Profile Page',
        pageStyle: "editprofile",
        pageScripts: ["account", "likePosts", "sortPosts"],
        myCommunities: myCommunities,
        communities: communities,
        user: user,
        profile: profile
    });
});

server.get('/createPost/:communityName?', function(req, resp){
    const communityName = req.params.communityName;
    const community = communities.find(c => c.communityName === communityName);

    resp.render('createPost',{
        layout: 'index',
        title: 'Create Post Page',
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
    console.log('Listening at port '+port);
});

