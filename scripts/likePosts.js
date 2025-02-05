function likePost(element) {
    element.classList.toggle("clicked");

    if (element.classList.contains("clicked")) {
        element.getElementsByClassName("bx")[0].classList.remove("bx-like");
        element.getElementsByClassName("bx")[0].classList.add("bxs-like");
        
        if (element.parentNode.getElementsByClassName("dislikeButton")[0].classList.contains("clicked")) {
            dislikePost(element.parentNode.getElementsByClassName("dislikeButton")[0]);
        }

        element.childNodes[1].innerHTML = Number(element.childNodes[1].innerHTML) + 1;
    }
    else {
        element.getElementsByClassName("bx")[0].classList.remove("bxs-like");
        element.getElementsByClassName("bx")[0].classList.add("bx-like");
        element.childNodes[1].innerHTML = element.childNodes[1].innerHTML - 1;
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

        element.childNodes[1].innerHTML = Number(element.childNodes[1].innerHTML) + 1;
    }
    else {
        element.getElementsByClassName("bx")[0].classList.remove("bxs-dislike");
        element.getElementsByClassName("bx")[0].classList.add("bx-dislike");
        element.childNodes[1].innerHTML = element.childNodes[1].innerHTML - 1;
    }
}