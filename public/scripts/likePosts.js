function likePost(element) {
    element.classList.toggle("clicked");

    if (element.classList.contains("clicked")) {
        element.getElementsByClassName("bx")[0].classList.remove("bx-like");
        element.getElementsByClassName("bx")[0].classList.add("bxs-like");
        
        if (element.parentNode.getElementsByClassName("dislikeButton")[0].classList.contains("clicked")) {
            dislikePost(element.parentNode.getElementsByClassName("dislikeButton")[0]);
        }

        $(element).parent().find(".voteValue").text(function(_, currentText) {
            return Number(currentText) + 1;
        });
    }
    else {
        element.getElementsByClassName("bx")[0].classList.remove("bxs-like");
        element.getElementsByClassName("bx")[0].classList.add("bx-like");

        $(element).parent().find(".voteValue").text(function(_, currentText) {
            return Number(currentText) - 1;
        });
    }
}

function dislikePost(element) {
    element.classList.toggle("clicked");

    if (element.classList.contains("clicked")) {
        element.getElementsByClassName("bx")[0].classList.remove("bx-dislike");
        element.getElementsByClassName("bx")[0].classList.add("bxs-dislike");

        if (element.parentNode.getElementsByClassName("likeButton")[0].classList.contains("clicked")) {
            likePost(element.parentNode.getElementsByClassName("likeButton")[0]);
        }

        $(element).parent().find(".voteValue").text(function(_, currentText) {
            return Number(currentText) - 1;
        });
    }
    else {
        element.getElementsByClassName("bx")[0].classList.remove("bxs-dislike");
        element.getElementsByClassName("bx")[0].classList.add("bx-dislike");

        $(element).parent().find(".voteValue").text(function(_, currentText) {
            return Number(currentText) + 1;
        });
    }
}

function postSettings(event, element) {
    const $floatingSettings = $(element).parent().find(".floatingSettings");
    
    if ($floatingSettings.hasClass("hidden")) {
        $(".floatingSettings").addClass("hidden");
        $floatingSettings.removeClass("hidden");
    }
    else {
        $(".floatingSettings").addClass("hidden");
    }

    event.stopPropagation();

    $(document).one("click", function(event) {
        if (!$(element).is(event.target) && !$(element).parent().find(".floatingSettings").is(event.target) && !$(element).parent().find(".floatingSettings").has(event.target).length) {
            $floatingSettings.addClass("hidden");
        }
    });
}

async function deletePost(postId) {
    if (confirm("Are you sure you want to delete this post?")) {
        try {
            const response = await fetch(`/api/delete-post/${postId}`, { method: "DELETE" });
            const result = await response.json();

            alert(result.message);
        } catch (error) {
            console.error("Error deleting post: ", error);
        }
    }
}

$(document).ready(async function() {
    const infoResponse = await fetch(`/api/get-users?sortBy=createdAt&order=1&limit=99&skip=0`);
    const info = await infoResponse.json();

    const communityResponse = await fetch(`/api/get-forums?sortBy=createdAt&order=1&limit=99&skip=0`);
    const communityData = await communityResponse.json();

    let sessionData = await getSession();
    let profile;

    if (sessionData != null) {
        profile = await (await fetch("/api/get-user-by-id/" + sessionData.id)).json();
    }

    let communityFlag = false;
    if (window.location.href.split("/")[3] == "" || window.location.href.split("/")[3] == "viewProfile" || window.location.href.split("/")[3].includes("search") || window.location.href.split("/")[3].includes("community")) {
        communityFlag = true;
    }

    $(".post").each(function (_, element) {
        let poster = info.find(user => user._id.toString() === $(element).find(".posterName").attr("id").toString());
        if (communityFlag) {
            let community = communityData.find(community => community._id.toString() === $(element).find(".communityName").attr("data-community").toString());
            $(element).find(".communityPic").attr("src", community.forumImage);
            $(element).find(".communityName").text("from s/" + community.name);
            $(element).find(".communityRedirect").attr("onclick", "window.location.href='/viewCommunity/" + community.name + "'");
        }
        
        $(element).find(".profilePic").attr("src", poster.profileImage);
        $(element).find(".posterName").text(poster.username);
        $(element).find(".postHeader").attr("onclick", "window.location.href='/viewProfile/" + poster.username + "'");
        $(element).find(".posterName").removeAttr("id");
        

        if ($("#originalReply")) {
            $("#originalReply").attr("placeholder", "Reply to @" + poster.username);
        }

        let postId = $(element).attr("id")

        if (sessionData != null) {
            let voteInfo = profile.votes.find(likedPosts => likedPosts.postId === postId);
            
            if (voteInfo) {
                if (voteInfo.vote == 1) {
                    $(element).find(".likeButton").addClass("clicked");
                    let likeIcon = $(element).find(".bx-like");
                    $(likeIcon).addClass("bxs-like");
                    $(likeIcon).removeClass("bx-like");
                }
                else {
                    $(element).find(".dislikeButton").addClass("clicked");
                    let dislikeIcon = $(element).find(".bx-dislike");
                    $(dislikeIcon).addClass("bxs-dislike");
                    $(dislikeIcon).removeClass("bx-dislike");
                }
            }
        }
    })

    $(".comment").each(function(_, element){
        let commentId = $(element).attr("id");
        if (sessionData != null) {
            let voteInfo = profile.commentVotes.find(likedComments => likedComments.commentId === commentId);
            if (voteInfo) {
                if (voteInfo.vote == 1) {
                    $(element).find(".likeButton").first().addClass("clicked");
                    let likeIcon = $(element).find(".bx-like").first();
                    $(likeIcon).addClass("bxs-like");
                    $(likeIcon).removeClass("bx-like");
                }
                else {
                    $(element).not(".comment").find(".dislikeButton").first().addClass("clicked");
                    let dislikeIcon = $(element).find(".bx-dislike").first();
                    $(dislikeIcon).addClass("bxs-dislike");
                    $(dislikeIcon).removeClass("bx-dislike");
                }
            }
        }
    });

    $(".likeButton").click(function() {
        let parentElement = $(this).closest(".post, .comment");
        let itemId = parentElement.attr("id");
        let isPost = parentElement.hasClass("post");
        toggleVote(itemId, 1, sessionData, isPost);
        // toggleVote($(this.parentNode.parentNode).attr("id"), 1, sessionData);

        if (sessionData != null) {
            likePost(this);
        }
    });

    $(".dislikeButton").click(function() {
        let parentElement = $(this).closest(".post, .comment");
        let itemId = parentElement.attr("id");
        let isPost = parentElement.hasClass("post");
        toggleVote(itemId, -1, sessionData, isPost);
        // toggleVote($(this.parentNode.parentNode).attr("id"), -1, sessionData);

        if (sessionData != null) {
            dislikePost(this);
        }
    })
});

$(document).on('click', '.deletePost', async function() {
    await deletePost($(this).closest(".post").attr("id"));
});

async function getSession() {
    try {
        const response = await fetch("/api/session");
        const result = await response.json();

        if (result.success) {
            currentSession = result.user;
            return currentSession;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error("Error checking session:", error);
    }
}

async function toggleVote(itemId, voteValue, sessionData, isPost) {
    if (!sessionData) {
        alert("Not logged in");
        return;
    }
    let path = isPost ? "/api/toggle-vote": "/api/toggle-comment-vote";
    let data = isPost ? {userId: sessionData.id, postId: itemId, voteValue}: {userId: sessionData.id, commentId: itemId, voteValue};
    try {
        const response = await fetch(path, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const success = await response.json();
    } 
    catch (error) {
        console.error("Error toggling vote:", error);
    }
}