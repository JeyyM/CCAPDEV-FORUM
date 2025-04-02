$(document).ready(async function() {
    async function addForum() {
        const name = document.getElementById("forumTitle").value.trim();
        const description = document.getElementById("forumDesc").value.trim();
        const bannerImage = document.getElementById("forumBanner").value.trim();
        const forumImage = document.getElementById("forumImage").value.trim();

        if (!checkSession()) {
            alert("Can't make forum if not logged in");
            return;
        }

        if (!name || !description || !bannerImage || !forumImage) {
            alert("Missing fields");
            return;
        }

        const forumsResponse = await fetch(`/api/get-forums?sortBy=createdAt&order=1&limit=99&skip=0`);
        const forums = await forumsResponse.json();
        let finalName = name.replace(/\s+/g, ''); //remove space
        const dForumName = forums.some(forum => forum.name.toLowerCase() === finalName.toLowerCase());
        if(dForumName){
            alert("Forum name is taken!");
            return; 
        }

        const newForum = {
            name: finalName,
            description,
            bannerImage,
            forumImage,
            membersCount: 0,
            postsCount: 0,
            admins: [currentSession.id],
            bannedUsers: []
        };

        try {
            const response = await fetch("/api/add-forum", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newForum)
            });

            const result = await response.json();

            alert(result.message);
            fetchForums();

            document.getElementById("forumName").value = "";
            document.getElementById("forumDescription").value = "";
            document.getElementById("bannerImage").value = "";
            document.getElementById("forumImage").value = "";
        } catch (error) {
            console.error("Error adding forum: ", error);
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
        addForum();
    })
})