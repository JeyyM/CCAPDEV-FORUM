function likePost(element) {
    element.classList.toggle("clicked");

    if (element.classList.contains("clicked")) {
        element.getElementsByClassName("bx")[0].classList.remove("bx-like");
        element.getElementsByClassName("bx")[0].classList.add("bxs-like");
        
        if (element.parentNode.getElementsByClassName("dislikeButton")[0].classList.contains("clicked")) {
            dislikePost(element.parentNode.getElementsByClassName("dislikeButton")[0]);
        }

        console.log($(element).parent().find(".voteValue"));

        $(element).parent().find(".voteValue").text(function(_, currentText) {
            console.log("+1");
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

function postSettings(element) {
    element.parentNode.getElementsByClassName("floatingSettings")[0].classList.toggle("hidden");
}

$(document).ready(async function() {
    const infoResponse = await fetch(`/api/get-users`)
    const info = await infoResponse.json();
    let sessionData = await getSession();
    let profile;

    if (sessionData != null) {
        profile = await (await fetch("/api/get-user-by-id/" + sessionData.id)).json()
        console.log(profile);
    }

    $(".post").each(function (_, element) {
        let poster = info.find(user => user._id.toString() === $(element).find(".posterName").attr("id").toString());
        console.log(poster.profileImage);

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

    $(".likeButton").click(function() {
        console.log(sessionData);
        
        toggleVote($(this.parentNode.parentNode).attr("id"), 1, sessionData);

        if (sessionData != null) {
            likePost(this);
        }
    });

    $(".dislikeButton").click(function() {
        console.log(sessionData);
        
        toggleVote($(this.parentNode.parentNode).attr("id"), -1, sessionData);

        if (sessionData != null) {
            dislikePost(this);
        }
    })

    
});

async function getSession() {
    try {
        const response = await fetch("/api/session");
        const result = await response.json();

        if (result.success) {
            console.log("Current session:", result);

            currentSession = result.user;
            return currentSession;
        }
        else {
            console.log("No current session");
            return null;
        }
    }
    catch (error) {
        console.error("Error checking session:", error);
    }
}

async function toggleVote(postId, voteValue, sessionData) {
    if (!sessionData) {
        alert("Not logged in");
        return;
    }

    try {
        const response = await fetch("/api/toggle-vote", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: sessionData.id, postId, voteValue })
        });

        const success = await response.json();
    } 
    catch (error) {
        console.error("Error toggling vote:", error);
    }
}