$(document).ready(async function() {
    const sessionResponse = await fetch("/api/session");
    const sessionData = await sessionResponse.json();
    let hasSession = sessionData.success;
    
    const userResponse = await fetch(`/api/get-user-by-name/${window.location.pathname.split('/')[2]}`);
    const user = await userResponse.json();

    $("#followUser").click(async function () {
        if (hasSession){
            try {
                const userResponse = await fetch(`/api/get-user-by-id/${sessionData.user.id}`);

                currentUser = await userResponse.json();
            }
            
            catch (error) {
                console.error("Error fetching user: ", error);
            }

            try {
                const response = await fetch("/api/toggle-user-follow", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: currentUser._id, targetId: user._id })
                });

                const result = await response.json();

                if (result.success) {
                    const updatedUser = await (await fetch(`/api/get-user-by-id/${sessionData.user.id}`)).json();

                    const userStatus = await fetch("/update/userGeneral", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ user: updatedUser })
                    });

                    $("#followUser").toggleClass("followed");

                    if (result.presentStatus == true) {
                        $("#followUser").html("<i class='bx bxs-bookmark'></i>Followed");
                        let followers = $(".followers").text().split(" ");
                        let followerCount = Number(followers[0]) + 1;
                        $(".followers").html("<i class='bx bxs-group'></i>" + followerCount + " Followers");
                    }
                    else {
                        $("#followUser").html("<i class='bx bx-bookmark'></i>Follow")
                        let followers = $(".followers").text().split(" ");
                        let followerCount = Number(followers[0]) - 1;
                        $(".followers").html("<i class='bx bxs-group'></i>" + followerCount + " Followers");
                    }
                }
                else {
                    alert(result.message);
                }
            } catch (error) {
                console.error("Error toggling user follow: ", error);
            }

        } else {
            alert("Not logged in");
        }
    });
});