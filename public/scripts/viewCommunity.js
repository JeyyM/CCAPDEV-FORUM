function joinCommunity(element) {
    element.classList.toggle("joined");

    if (element.classList.contains("joined")) {
        element.getElementsByClassName("bx")[0].classList.remove("bx-bookmark");
        element.getElementsByClassName("bx")[0].classList.add("bxs-bookmark");
        element.childNodes[1].textContent = "Joined";

        document.getElementsByClassName("followers")[0].childNodes[1].innerHTML = Number(document.getElementsByClassName("followers")[0].childNodes[1].innerHTML) + 1;
    }
    else {
        element.getElementsByClassName("bx")[0].classList.remove("bxs-bookmark");
        element.getElementsByClassName("bx")[0].classList.add("bx-bookmark");
        element.childNodes[1].textContent = "Join";

        document.getElementsByClassName("followers")[0].childNodes[1].innerHTML = Number(document.getElementsByClassName("followers")[0].childNodes[1].innerHTML) - 1;
    }
}