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
