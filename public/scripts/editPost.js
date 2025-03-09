$(document).ready(async function() {
    async function updatePost(postId, postTitle, postContent, forumId) {
        try {
            const response = await fetch(`/api/update-post/${postId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: postTitle,
                    content: postContent,
                    updatedAt: new Date()
                })
            });

            const result = await response.json();

            alert(result.message);
        } catch (error) {
            console.error("Error updating post: ", error);
        }
    }

    $("#editPost").click(async function() {
        console.log(window.location.href.split("editPost/")[1]);
        await updatePost(window.location.href.split("editPost/")[1], $("#postTitle").val(), $("#postBody").val(), $(".communitySelected").attr("id"));
    })

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

    $("#confirmPost").click(function() {
        addPost();
    })
})
