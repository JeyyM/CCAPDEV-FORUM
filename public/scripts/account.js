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

function profileSettings() {
    document.getElementById("profileSettings").classList.toggle("hidden");
}

$(document).ready(function() {
    let currentSession = null;

    async function checkSession() {
        try {
            const response = await fetch("/api/session");
            const result = await response.json();

            if (result.success) {
                console.log("Current session:", result);

                currentSession = result.user;
                return true
            }
            else {
                console.log("No current session");
                return false
            }
        }
        catch (error) {
            console.error("Error checking session:", error);
        }
    }

    let isLoggedIn;
    window.addEventListener("load", async () => {
        isLoggedIn = await checkSession();
    });

    document.getElementById("loginForm").addEventListener("submit", async function login(event) {
        event.preventDefault();
    
        const email = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        // const rememberMe = document.getElementById("rememberMe").checked;
    
        if (!email || !password) {
            alert("Missing fields");
            return;
        }
    
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, rememberMe })
            });
    
            const result = await response.json();
    
            if (!result.success) {
                alert(result.message);
            }
            else {
                const userLogin = await fetch("/update/userLogin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user: result.user })
                });

                location.reload();
            }
        } catch (error) {
            console.error("Error logging in: ", error);
        }
    });

    async function logout() {

        if (currentSession === null){
            alert("Not logged in the first place");
            return;
        }

        try {
            const response = await fetch("/api/logout", { method: "POST" });
            const result = await response.json();

            if (result.success) {
                alert(result.message);

                const userLogout = await fetch("/update/userLogout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user: result.user })
                });

                location.reload(); 
            }
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    }

    document.getElementById("logout").addEventListener("click", logout);
});