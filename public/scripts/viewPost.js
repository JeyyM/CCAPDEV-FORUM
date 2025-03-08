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
    saveEdit.classList.add("postReply");
    saveEdit.innerHTML = "Save";

    saveEdit.onclick = function () {
        cancelComment(cancelEdit);
        commentText.innerHTML = editTextarea.value;
        commentText.style.display = "block";
    };
    
    editContainer.appendChild(editTextarea);
    editContainer.appendChild(cancelEdit);
    editContainer.appendChild(saveEdit);

    //hide og comment text and insert edit container
    commentText.style.display = "none";
    commentContainer.insertBefore(editContainer, commentText.nextSibling);
}
