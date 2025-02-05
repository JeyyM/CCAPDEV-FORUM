function login() {
    document.getElementById("unfocus").style.display = "block";
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "flex";
}

function signup() {
    document.getElementById("unfocus").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "flex";
}

function unfocus() {
    document.getElementById("unfocus").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "none";
}