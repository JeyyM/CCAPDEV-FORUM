function showPostButtons(element) {
    let container = element.parentNode;

    let buttons = container.getElementsByClassName("replyButton");
    
    Array.from(buttons).forEach(button => {
        button.classList.toggle("hidden");
    });
}

function hidePostButtons(element) {
    let container = element.parentNode;

    let buttons = container.getElementsByClassName("replyButton");
    
    Array.from(buttons).forEach(button => {
        button.classList.toggle("hidden");
    });
}

function postButtons(event, element) {
    const $replyButton = $(element).find(".replyButton");
    $($replyButton[0]).removeClass("hidden");
    $($replyButton[1]).removeClass("hidden");

    event.stopPropagation();

    $(document).one("click", function(event) {
        if (!$(element).is(event.target) && !$(element).find(".replyButton").is(event.target) && !$(element).parent().find(".replyButton").has(event.target).length) {
            $replyButton.addClass("hidden");
        }
    });
}

function newComment(element) {
    let comment = element.parentNode.parentNode;
    if (document.getElementById("tempReply")) {
        document.getElementById("tempReply").remove();
    }

    let replyContainer = document.createElement("div");
    replyContainer.classList.add("replyContainer");
    replyContainer.id = "tempReply";

    let commentReply = document.createElement("textarea");
    commentReply.classList.add("replyContent");
    commentReply.placeholder = "Reply to @" + comment.children[0].children[0].children[1].children[0].innerHTML;

    let cancelReply = document.createElement("button");
    cancelReply.classList.add("cancelReply");
    cancelReply.onclick = function() { cancelComment(this) };
    cancelReply.innerHTML = "Cancel";

    let postReply = document.createElement("button");
    postReply.classList.add("postReply");
    postReply.innerHTML = "Post";

    replyContainer.appendChild(commentReply);
    replyContainer.appendChild(cancelReply);
    replyContainer.appendChild(postReply);

    comment.insertBefore(replyContainer, comment.childNodes[7]);
}

async function addComment(postId, authorId, commentContent, parentId) {
    if (!currentSession) {
        alert("Can't make comment if not logged in");
        return;
    }

    if (!commentContent) {
        alert("Missing fields");
        return;
    }

    const newComment = {
        postId: postId,
        authorId: authorId,
        parentId: parentId,
        content: commentContent,
        voteValue: 0,
    };


    try {
        const response = await fetch("/api/add-comment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newComment)
        });

        const result = await response.json();

        alert(result.message);
    } catch (error) {
        console.error("Error adding comment: ", error);
    }
}

function cancelComment(element) {
    element.parentNode.remove();
}

function editComment(element) {
    $("#tempEdit").remove();
    $(".commentContent").removeAttr("style")
    
    $(element).parent().addClass("hidden");

    let commentContainer = element.closest(".comment");

    let commentText = commentContainer.querySelector(".commentContent");

    //edit
    let editContainer = document.createElement("div");
    editContainer.classList.add("replyContainer");
    editContainer.id = "tempEdit";

    //textarea 
    let editTextarea = document.createElement("textarea");
    editTextarea.classList.add("replyContent");
    editTextarea.classList.add("replyContent");
    editTextarea.value = commentText.textContent;

    editTextarea.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    });

    let cancelEdit = document.createElement("button");
    cancelEdit.classList.add("cancelReply");
    cancelEdit.innerHTML = "Cancel";
    cancelEdit.onclick = function () { 
        cancelComment(cancelEdit);
        commentText.style.display = "block";
    };

    let saveEdit = document.createElement("button");
    saveEdit.classList.add("editReply");
    saveEdit.innerHTML = "Save";
    saveEdit.id = "editReply";

    saveEdit.onclick = async function () {
        cancelComment(cancelEdit);
        commentText.innerHTML = editTextarea.value;
        commentText.style.display = "block";

        await updateComment($(commentContainer).attr("id"), editTextarea.value);
    };
    
    editContainer.appendChild(editTextarea);
    editContainer.appendChild(cancelEdit);
    editContainer.appendChild(saveEdit);

    //hide og comment text and insert edit container
    commentText.style.display = "none";
    commentContainer.insertBefore(editContainer, commentText.nextSibling);
}

async function updateComment(commentId, postContent) {
    try {
        const response = await fetch(`/api/update-comment/${commentId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: postContent,
                updatedAt: new Date()
            })
        });

        const result = await response.json();

        alert(result.message);
    } catch (error) {
        console.error("Error updating post: ", error);
    }
}

async function deleteComment(commentId) {
    if (confirm("Are you sure you want to delete this comment?")) {
        try {
            const response = await fetch(`/api/delete-comment/${commentId}`, { method: "DELETE" });
            const result = await response.json();

            alert(result.message);
            location.reload();
        } catch (error) {
            console.error("Error deleting comment: ", error);
        }
    }
}

$(document).ready(async function() {
    const infoResponse = await fetch(`/api/get-users?sortBy=createdAt&order=1&limit=99&skip=0`)
    const info = await infoResponse.json();

    $(".comment").each(function (_, element) {
        let poster = info.find(user => user._id.toString() === $(element).find(".posterName").attr("id").toString());
        $(element).find(".commentHeader").attr("onclick", "window.location.href='/viewProfile/" + poster.username + "'");
        $(element).find(".profilePic").attr("src", poster.profileImage);
        $(element).find(".posterName").text(poster.username);
        $(element).find(".postHeader").attr("onclick", "window.location.href='/viewProfile/" + poster.username + "'");
        $(element).find(".posterName").removeAttr("id");

        if ($("#originalReply")) {
            $("#originalReply").attr("placeholder", "Reply to @" + poster.username);
        }
    })

    $(".cancelReply").click(function(event) {
        $(".replyButton").addClass("hidden");
        event.stopPropagation();
    })

    let currentSession = null;

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

    let sessionData = await getSession();

    $(".postReply").click(function() {
        if (sessionData == null) {
            alert("Can't make comment if not logged in");
            return;
        } 
        else {
            addComment(window.location.href.split("viewPost/")[1], sessionData.id, $("#originalReply").val().trim(), null);
        }

        location.reload();
    })

    $(".deleteComment").click(async function() {
        await deleteComment($(this).closest(".comment").attr("id"));
    })
})