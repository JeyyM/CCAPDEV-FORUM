$(document).ready(async function() {
    const sessionResponse = await fetch("/api/session");
    const sessionData = await sessionResponse.json();
    let hasSession = sessionData.success;
    
    const forumResponse = await fetch(`/api/get-forum-by-name/${window.location.pathname.split('/')[2]}`);
    const forum = await forumResponse.json();
    console.log(forum);
    
    console.log("ready");

    $("#joinCommunity").click(async function () {
        console.log("clicked");
        if (hasSession){
            try {
                const userResponse = await fetch(`/api/get-user-by-id/${sessionData.user.id}`);

                currentUser = await userResponse.json();
            }
            
            catch (error) {
                console.error("Error fetching user: ", error);
            }

            try {
                const response = await fetch("/api/toggle-forum-join", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: currentUser._id, forumId: forum._id })
                });

                const result = await response.json();

                if (result.success) {
                    console.log("Join status changed: " + result.presentStatus);

                    const updatedUser = await (await fetch(`/api/get-user-by-id/${sessionData.user.id}`)).json();

                    const userStatus = await fetch("/update/userGeneral", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ user: updatedUser })
                    });

                    $("#joinCommunity").toggleClass("joined");

                    if (result.presentStatus == true) {
                        $("#joinCommunity").html("<i class='bx bxs-bookmark'></i>Joined");
                        let followers = $(".followers").text().split(" ");
                        let followerCount = Number(followers[0]) + 1;
                        $(".followers").html("<i class='bx bxs-group'></i>" + followerCount + " Members");
                    }
                    else {
                        $("#joinCommunity").html("<i class='bx bx-bookmark'></i>Join")
                        let followers = $(".followers").text().split(" ");
                        let followerCount = Number(followers[0]) - 1;
                        $(".followers").html("<i class='bx bxs-group'></i>" + followerCount + " Members");
                    }
                }
                else {
                    alert(result.message);
                }
            } catch (error) {
                console.error("Error toggling forum join: ", error);
            }

        } else {
            alert("Not logged in");
        }
    });
});