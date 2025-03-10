$(document).ready(async function() {
    async function addPost() {
        const title = document.getElementById("postTitle").value.trim();
        const content = document.getElementById("postBody").value.trim();
    
        if (!currentSession){
            alert("Can't make post if not logged in");
            return;
        }
    
        if (!title || !content || document.getElementById("forumSelect").value == "") {
            alert("Missing fields or invalid forum");
            return;
        }
    
        const newPost = {
            forumId: document.getElementById("forumSelect").value,
            authorId: currentSession.id,
            title: title,
            content: content,
            voteValue: 0,
            comments: []
        };
    
        try {
            const response = await fetch("/api/add-post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPost)
            });
    
            const result = await response.json();
            console.log(result);

            alert(result.message);
    
            $("#postTitle").val("");
            $("#postBody").val("");

            if (result.message === 'Post added successfully'){
                window.location.href = `/viewPost/${result.postId.toString()}`;
            }
        } catch (error) {
            console.error("Error adding post: ", error);
        }
    }

    let currentSession = null;

    async function checkSession() {
        try {
            const response = await fetch("/api/session");
            const result = await response.json();

            if (result.success) {
                currentSession = result.user;
                return true
            }
            else {
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

    $("#confirmPost").click(function() {
        addPost();
    })
})
