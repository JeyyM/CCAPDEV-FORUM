function sortClicked() {
    let main = document.getElementById("sort");
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

function sortSelected(choice) {
    let mainSort = document.getElementById("mainSort");
    let current = document.getElementById("current");

    current.innerHTML = choice.innerHTML + "<i class='bx bx-chevron-down'></i>";

    let main = document.getElementById("sort");
    let choices = main.getElementsByClassName("choices");
    
    Array.from(choices).forEach(element => {
        element.style.display = "none";
    });
}