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

function addComment(element) {
    let comment = element.parentNode.parentNode;
    if (document.getElementById("tempReply")) {
        document.getElementById("tempReply").remove();
    }

    let replyContainer = document.createElement("div");
    replyContainer.classList.add("replyContainer");
    replyContainer.id = "tempReply";

    let commentReply = document.createElement("textarea");
    commentReply.classList.add("replyContent");
    commentReply.placeholder = "Reply to @" + comment.childNodes[1].childNodes[3].childNodes[1].innerHTML;

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

function cancelComment(element) {
    element.parentNode.remove();
}

function editComment(element) {
    let commentContainer = element.closest(".comment");

    if (!commentContainer) {
        console.error("Comment container not found.");
        return;
    }

    let commentText = commentContainer.querySelector(".commentContent");

    if (!commentText) {
        console.error("Comment content not found inside the container.");
        console.log("commentContainer content:", commentContainer.innerHTML);
        return;
    }

    if (!commentText.getAttribute("contenteditable")) {
        commentText.setAttribute("contenteditable", "true");
        commentText.focus();
        element.innerHTML = "<i class='bx bx-save'></i>Save";
    } else {
        commentText.removeAttribute("contenteditable");
        element.innerHTML = "<i class='bx bx-edit-alt'></i>Edit";

    }
}
