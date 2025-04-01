$(document).ready(async function() {
    const sessionResponse = await fetch("/api/session");
    const sessionData = await sessionResponse.json();
    let hasSession = sessionData.success;
    
    async function updateUser(userId, newName, newEmail, newPass, newBio, newBannerImage, newProfileImage) {
        try {
            const response = await fetch(`/api/update-user/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: newName,
                    email: newEmail,
                    password: newPass,
                    bio: newBio,
                    bannerImage: newBannerImage,
                    profileImage: newProfileImage,
                    updatedAt: new Date()
                })
            });

            const result = await response.json();

            alert(result.message);
        } catch (error) {
            console.error("Error updating forum: ", error);
        }
    }

    $("#editProfile").click(async function() {
        if (hasSession) {
            try {
                const userResponse = await fetch(`/api/get-user-by-id/${sessionData.user.id}`);

                currentUser = await userResponse.json();
            }
            
            catch (error) {
                console.error("Error fetching user: ", error);
            }

            const profileResponse = await fetch(`/api/get-user-by-id/${sessionData.user.id}`);
            const profile = await profileResponse.json();
            
            await updateUser(profile._id.toString(), $("#usernameInput").val(), profile.email, profile.password, $("#biographyBody").val(), $("#bannerInput").val(), $("#profileInput").val());

            const updatedUser = await (await fetch(`/api/get-user-by-id/${sessionData.user.id}`)).json();

            const response = await fetch("/update/userGeneral", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: updatedUser })
            });

            window.location.href = "/editProfile";
        }
        else {
            alert("Not logged in");
        }
    })
})