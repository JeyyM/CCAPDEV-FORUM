$(document).ready(async function() {
    async function updateForum(forumId, newName, newDescription, newBannerImage, newForumImage) {
        try {
            const response = await fetch(`/api/update-forum/${forumId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newName,
                    description: newDescription,
                    bannerImage: newBannerImage,
                    forumImage: newForumImage,
                    updatedAt: new Date()
                })
            });

            const result = await response.json();

            alert(result.message);
            fetchForums(0, false, true); 
        } catch (error) {
            console.error("Error updating forum: ", error);
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

    $("#confirmPost").click(async function() {
        const forumName = window.location.href.split("editForum/")[1];
        const forumResponse = await fetch(`/api/get-forum-by-name/${forumName}`);
        const forum = await forumResponse.json();
        const newForumName = $("#forumTitle").val().trim();
        const newForumDesc = $("#forumDesc").val().trim();
        const newForumBanner = $("#forumBanner").val().trim();
        const newForumImage = $("#forumImage").val().trim();
        
        updateForum(forum._id, newForumName, newForumDesc, newForumBanner, newForumImage);
    })
})