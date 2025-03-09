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

    async function addUser() {
        const username = document.getElementById("usernameFormInput").value.trim();
        const email = document.getElementById("emailFormInput").value.trim();
        const password = document.getElementById("passwordFormInput").value.trim();
        const confirmPassword = document.getElementById("passwordFormConfirm").value.trim();
        const userBanner = document.getElementById("bannerFormPic").value.trim();
        const userImage = document.getElementById("profileFormPic").value.trim();
        const bio = "";

        if (!username || !email || !password || !confirmPassword || !userBanner || !userImage ) {
            alert("Missing fields");
            return;
        }

        if (password != confirmPassword) {
            alert("Password does not match");
            return;
        }

        const newProfile = {
            username,
            email,
            bio,
            password,
            bannerImage: userBanner,
            profileImage: userImage,
            joinedForums: [],
            followers: 0,
            following: []
        };

        try {
            const response = await fetch("/api/add-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProfile)
            });

            const result = await response.json();

            alert(result.message);
            fetchUsers();

            document.getElementById("userName").value = "";
            document.getElementById("userEmail").value = "";
            document.getElementById("userBio").value = "";
            document.getElementById("userPassword").value = "";
            document.getElementById("userBanner").value = "";
            document.getElementById("userImage").value = "";
        } catch (error) {
            console.error("Error adding user: ", error);
        }
    }

    $("#signupButton").click(async function() {
        await addUser();
    })
});