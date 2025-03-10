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

            if (result.success){
                window.location.href = `/viewPost/${result.postId}`
            }

        } catch (error) {
            console.error("Error updating post: ", error);
        }
    }

    $("#editPost").click(async function() {
        await updatePost(window.location.href.split("editPost/")[1], $("#postTitle").val(), $("#postBody").val(), $(".communitySelected").attr("id"));
    })

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