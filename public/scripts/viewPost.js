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

function cancelComment(element) {
    element.parentNode.remove();
}

function editComment(element) {
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

$(document).ready(async function() {
    const infoResponse = await fetch(`/api/get-users?sortBy=createdAt&order=1&limit=99&skip=0`)
    const info = await infoResponse.json();

    $(".comment").each(function (_, element) {
        let poster = info.find(user => user._id.toString() === $(element).find(".posterName").attr("id").toString());
        console.log(poster.profileImage);

        $(element).find(".profilePic").attr("src", poster.profileImage);
        $(element).find(".posterName").text(poster.username);
        $(element).find(".postHeader").attr("onclick", "window.location.href='/viewProfile/" + poster.username + "'");
        $(element).find(".posterName").removeAttr("id");

        if ($("#originalReply")) {
            $("#originalReply").attr("placeholder", "Reply to @" + poster.username);
        }
    })
})