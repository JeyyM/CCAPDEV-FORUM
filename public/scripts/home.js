$(document).ready(async function() {
    const sessionResponse = await fetch("/api/session");
    const sessionData = await sessionResponse.json();
    let currentUser = null;
    let hasSession = sessionData.success;

    const infoResponse = await fetch(`/api/get-users?sortBy=createdAt&order=1&limit=99&skip=0`);
    const info = await infoResponse.json();

    const communityResponse = await fetch(`/api/get-forums?sortBy=createdAt&order=1&limit=99&skip=0`);
    const communityData = await communityResponse.json();

    let skip = 0;

    if (hasSession){
        try {
            const userResponse = await fetch(`/api/get-user-by-id/${sessionData.user.id}`);

            currentUser = await userResponse.json();
        }
        
        catch (error) {
            console.error("Error fetching user: ", error);
        }

        let isFetching = false;

        $(window).on('scroll', async function () {
            if ($(window).scrollTop() >= $('.postContainer').offset().top + $('.postContainer').outerHeight() - window.innerHeight) {
                if (isFetching) return;

                isFetching = true;

                try {
                    const forumParam = currentUser.joinedForums.length > 0 ? currentUser.joinedForums.join(",") : "all";

                    let postsResponse = await fetch(`api/get-posts-by-forums/${forumParam}?sortBy=title&order=11&limit=5&skip=${skip}`);
                    let posts = await postsResponse.json();

                    skip += posts.length;

                    posts.forEach(function(post, _) {
                        let poster = info.find(user => user._id.toString() === post.authorId.toString());
                        let community = communityData.find(community => community._id.toString() === post.forumId.toString());

                        let postContent = postBuilder(post, poster, community, sessionData.user);
                        $(".postContainer").append(postContent);
                    });
                }
                catch (error) {
                    console.error("Error fetching posts:", error);
                }
                finally {
                    isFetching = false;
                }
            }
        }); 
    }
    else {
        let isFetching = false;

        $(window).on('scroll', async function () {
            if ($(window).scrollTop() >= $('.postContainer').offset().top + $('.postContainer').outerHeight() - window.innerHeight) {
                if (isFetching) return;

                isFetching = true;

                try {
                    const forumParam = "all";
                    let postsResponse = await fetch(`api/get-posts-by-forums/${forumParam}?sortBy=title&order=1&limit=5&skip=${skip}`);
                    let posts = await postsResponse.json();

                    skip += posts.length;

                    posts.forEach(function(post, _) {
                        let poster = info.find(user => user._id.toString() === post.authorId.toString());
                        let community = communityData.find(community => community._id.toString() === post.forumId.toString());

                        let postContent = postBuilder(post, poster, community,  null);
                        $(".postContainer").append(postContent);
                    });
                }
                catch (error) {
                    console.error("Error fetching posts:", error);
                }
                finally {
                    isFetching = false;
                }
            }
        }); 
    }
})

function formatDate (date) {
    return new Date(date).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
}

function isDateEqual (date1, date2) {
    return new Date(date1).getTime() === new Date(date2).getTime();
}

function postBuilder(param, poster, community, user) {
    let postMain = $(`<div class="post" id="${param._id}"></div>`);
    let postHeaderContainer = $(`<div class="postHeaderContainer"></div>`);
    let postHeader = $(`<div class="postHeader" onclick="window.location.href='/viewProfile/${param._id}'"></div>`);
    let profilePic = $(`<img src="${poster.profileImage}" class="profilePic">`);
    let nameTime;
    if (isDateEqual(param.updatedAt, param.createdAt)) {
        nameTime = $(`<div><span class="posterName">${poster.username}</span><span class="timePosted">${formatDate(param.createdAt)}</span></div>`);
    }
    else {
        nameTime = $(`<div><span class="posterName">${poster.username}</span><span class="timePosted">${formatDate(param.createdAt)} <span class="dot">•</span> <span class="timePosted">[EDITED]</span></span></div>`);
        
    }

    postHeader.append(profilePic);
    postHeader.append(nameTime);

    postHeaderContainer.append(postHeader);

    if (user != null) {
        if (user.id.toString() == param.authorId.toString()) {
            let postSettings = $(`<div class="postSettings">
                                    <i class="bx bx-dots-horizontal-rounded" onclick="postSettings(event, this)"></i>
                                    <div class="floatingSettings hidden">
                                        <button class="editPost" onclick="window.location.href='/editPost/${param._id.toString()}'"><i class="bx bx-edit-alt"></i>Edit</button>
                                        <button class="deletePost"><i class="bx bx-trash"></i>Delete</button>
                                    </div>
                                </div>`);
                
            postHeaderContainer.append(postSettings);
        }
    }

    let postContent = $(`<div class="postContent" onclick="window.location.href='/viewPost/${param._id.toString()}'"></div>`);
    let postTitle = $(`<span class="postTitle">${param.title}</span>`);
    let postBody = $(`<span class="postBody">${param.content}</span>`);

    postContent.append(postTitle);
    postContent.append(postBody);

    let postEngagement = $(`<div class="postEngagement">
                            <button class="likeButton"><i class="bx bx-like"></i></button>
                            <span class="voteValue">${param.voteValue}</span>
                            <button class="dislikeButton"><i class="bx bx-dislike"></i></button>
                            <button class="commentButton" onclick="window.location.href='/viewPost/${param._id.toString()}'"><i class="bx bxs-comment"></i><span>${param.commentsCount}</span></button>
                            <button class="share"><i class="bx bxs-share-alt"></i></button>
                            </div>`);

    let communityHeader = $(`<div class="fromCommunity">
                             <div class="communityRedirect" onclick="window.location.href='/viewCommunity/${community.name}'">
                             <img src="${community.forumImage}" class="communityPic">
                             <div class="communityHeader">
                             <span class="communityName" data-community="${community._id.toString()}">from s/${community.name}</span>
                             </div>
                             </div>
                             </div>`);

    postMain.append(communityHeader);
    postMain.append(postHeaderContainer);
    postMain.append(postContent);
    postMain.append(postEngagement);

    return postMain;
}