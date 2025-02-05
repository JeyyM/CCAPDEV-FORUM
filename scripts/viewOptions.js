function viewClicked() {
    let main = document.getElementById("viewOptions");
    let choices = main.getElementsByClassName("choices");
    
    Array.from(choices).forEach(element => {
        if (element.style.display == "flex") {
            element.style.display = "none";
        }
        else {
            element.style.display = "flex";
        }
    });
}

function viewSelected(choice) {
    let mainSort = document.getElementById("mainView");
    let current = document.getElementById("currentView");

    current.innerHTML = choice.innerHTML + "<i class='bx bx-chevron-down'></i>";

    let main = document.getElementById("viewOptions");
    let choices = main.getElementsByClassName("choices");
    
    Array.from(choices).forEach(element => {
        element.style.display = "none";
    });
}