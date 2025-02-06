function tryLogIn() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (password == "minecraft") {
        if (username == "Steve") {
            var url = window.location.pathname;
            var filename = url.substring(url.lastIndexOf('/')+1);
            
            window.location = filename.replace("Signout", "Steve");
        }
        else if (username == "Mia") {
            var url = window.location.pathname;
            var filename = url.substring(url.lastIndexOf('/')+1);
            
            window.location = filename.replace("Signout", "Mia");
        }
    }
}