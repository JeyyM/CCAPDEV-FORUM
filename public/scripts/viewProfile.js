$(document).ready(async function() {
    const sessionResponse = await fetch("/api/session",{
        credentials: 'same-origin'
    });
    const sessionData = await sessionResponse.json();
    let hasSession = sessionData.success;
    
    const userResponse = await fetch(`/api/get-user-by-name/${window.location.pathname.split('/')[2]}`);
    const user = await userResponse.json();

    let options = $("#viewOptions").find(".choices");

    const selected = window.location.href.split("/");
    if (selected.length == 6) {
        document.getElementsByClassName(window.location.href.split("/")[5])[0].click();
    }

    $(options).each(function(_, elem) {
        $(elem).click(function() {
            const profile = window.location.href.split("/")[4];
            window.location.href = `${window.location.href.split(`/${profile}`)[0]}/${profile}/${$(elem).text()}`;
        })
    })

    $("#followUser").click(async function () {
        if (hasSession){
            try {
                const userResponse = await fetch(`/api/get-user-by-id/${sessionData.user.id}`);

                currentUser = await userResponse.json();
            }
            
            catch (error) {
                console.error("Error fetching user: ", error);
            }

            try {
                const response = await fetch("/api/toggle-user-follow", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: currentUser._id, targetId: user._id })
                });

                const result = await response.json();

                if (result.success) {
                    const updatedUser = await (await fetch(`/api/get-user-by-id/${sessionData.user.id}`)).json();

                    const userStatus = await fetch("/update/userGeneral", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ user: updatedUser })
                    });

                    $("#followUser").toggleClass("followed");

                    if (result.presentStatus == true) {
                        $("#followUser").html("<i class='bx bxs-bookmark'></i>Followed");
                        let followers = $(".followers").text().split(" ");
                        let followerCount = Number(followers[0]) + 1;
                        $(".followers").html("<i class='bx bxs-group'></i>" + followerCount + " Followers");
                    }
                    else {
                        $("#followUser").html("<i class='bx bx-bookmark'></i>Follow")
                        let followers = $(".followers").text().split(" ");
                        let followerCount = Number(followers[0]) - 1;
                        $(".followers").html("<i class='bx bxs-group'></i>" + followerCount + " Followers");
                    }
                }
                else {
                    alert(result.message);
                }
            } catch (error) {
                console.error("Error toggling user follow: ", error);
            }

        } else {
            alert("Not logged in");
        }
    });

    const profile = window.location.href.split("/")[4];
    const option = window.location.href.split(`${profile}/`)[1];
    console.log(option);
    
    if (option == "" || option == "All" || option == "Comments") {
        const infoResponse = await fetch(`/api/get-users?sortBy=createdAt&order=1&limit=99&skip=0`)
        const info = await infoResponse.json();

        const commentsResponse = await fetch(`/api/get-comments-by-author/${user._id}`);
        const comments = await commentsResponse.json();

        $(comments).each(function (_, comment) {
            if (comment.parentId == null) {
                var element = $(`#${comment._id}`);
                console.log(comment._id);
                let poster = info.find(user => user._id.toString() === $(element).find(".posterName").attr("id").toString());
                $(element).find(".commentHeader").attr("onclick", "window.location.href='/viewProfile/" + poster.username + "'");
                $(element).find(".profilePic").attr("src", poster.profileImage);
                $(element).find(".posterName").text(poster.username);
                $(element).find(".postHeader").attr("onclick", "window.location.href='/viewProfile/" + poster.username + "'");
                $(element).find(".posterName").removeAttr("id");

                if ($("#originalReply")) {
                    $("#originalReply").attr("placeholder", "Reply to @" + poster.username);
                }
            }
            else {
                var parent = comments.find(function (elem) {
                    return elem._id = comment.parentId;
                });

                var element = $(`#${parent._id}`);

                let poster = info.find(user => user._id === comment.authorId);

                var newComment = createComment(comment, sessionData);
                
                var engagement = $(element).find(".commentEngagement").first();

                console.log(element);

                $(newComment).insertAfter(engagement);

                $(newComment).find(".commentHeader").attr("onclick", "window.location.href='/viewProfile/" + poster.username + "'");
                $(newComment).find(".profilePic").attr("src", poster.profileImage);
                $(newComment).find(".posterName").text(poster.username);
                $(newComment).find(".postHeader").attr("onclick", "window.location.href='/viewProfile/" + poster.username + "'");
                $(newComment).find(".posterName").removeAttr("id");
            }
        })
    }
});

function createComment(param, sessionData) {
    let user;
    if (sessionData != null) {
        user = sessionData.user;
    }

    let postMain = $(`<div class="comment" id="${param._id}"></div>`);
    let postHeaderContainer = $(`<div class="commentHeaderContainer"></div>`);
    let postHeader = $(`<div class="commentHeader" onclick="window.location.href='/viewProfile/'"></div>`);
    let profilePic = $(`<img src="" class="profilePic">`);
    let nameTime;
    if (isDateEqual(param.updatedAt, param.createdAt)) {
        nameTime = $(`<div><span class="posterName" id="${param.authorId}"></span><span class="dot">•</span><span class="timePosted">${formatDate(param.createdAt)}</span></div>`);
    }
    else {
        nameTime = $(`<div><span class="posterName" id="${param.authorId}"></span><span class="dot">•</span><span class="timePosted">${formatDate(param.createdAt)}</span><span class="dot">•</span><span class="timePosted">[EDITED]</span></div>`);
    }

    postHeader.append(profilePic);
    postHeader.append(nameTime);

    postHeaderContainer.append(postHeader);

    if (user != null) {
        if (user.id.toString() == param.authorId.toString()) {
            let postSettings = $(`<div class="postSettings">
                                    <i class="bx bx-dots-horizontal-rounded" onclick="postSettings(event, this)"></i>
                                    <div class="floatingSettings hidden">
                                        <button class="editComment" onclick="editComment(this)"><i class="bx bx-edit-alt"></i>Edit</button>
                                        <button class="deleteComment"><i class="bx bx-trash"></i>Delete</button>
                                    </div>
                                </div>`);
                
            postHeaderContainer.append(postSettings);
        }
    }

    let postContent = $(`<div class="commentContent">${param.content}</div>`);
    let postEngagement;

    if (sessionData != null) {
        postEngagement = $(`<div class="commentEngagement">
            <button class="likeButton"><i class="bx bx-like"></i></button>
            <span class="voteValue">${param.voteValue}</span>
            <button class="dislikeButton"><i class="bx bx-dislike"></i></button>
            <button class="commentButton" onclick="newComment(this, '${sessionData.id}')"><i class="bx bx-comment"></i></button>
            <button class="share"><i class="bx bxs-share-alt"></i></button>
            </div>`);
    }
    else {
        postEngagement = $(`<div class="commentEngagement">
            <button class="likeButton"><i class="bx bx-like"></i></button>
            <span class="voteValue">${param.voteValue}</span>
            <button class="dislikeButton"><i class="bx bx-dislike"></i></button>
            <button class="commentButton" onclick="newComment(this, null)"><i class="bx bx-comment"></i></button>
            <button class="share"><i class="bx bxs-share-alt"></i></button>
            </div>`);
    }

    postMain.append(postHeaderContainer);
    postMain.append(postContent);
    postMain.append(postEngagement);

    return postMain;
}

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