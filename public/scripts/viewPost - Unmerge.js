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

$(document).ready(async function() {
    const infoResponse = await fetch(`/api/get-users`)
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