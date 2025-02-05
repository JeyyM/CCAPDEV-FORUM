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

    let replyContainer = document.createElement("div");
    replyContainer.classList.add("replyContainer");

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