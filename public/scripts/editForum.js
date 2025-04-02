$(document).ready(async function() {
    async function updateForum(forumId, newName, newDescription, newBannerImage, newForumImage) {
        try {
            const forumsResponse = await fetch(`/api/get-forums?sortBy=createdAt&order=1&limit=99&skip=0`);
            const forums = await forumsResponse.json();
            let finalName = newName.replace(/\s+/g, ''); //remove space
            const dForum = forums.find(forum => forum.name.toLowerCase() === finalName.toLowerCase());
            if(dForum && dForum._id !== forumId && dForum.name.toLowerCase() === finalName.toLowerCase()){
                alert("Forum name is taken!");
                return; 
            }
            
            const response = await fetch(`/api/update-forum/${forumId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: finalName,
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