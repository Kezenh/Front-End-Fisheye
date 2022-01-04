const queryString = window.location.search;
const urlId = new URLSearchParams(queryString).get("id");

//DOM elements
const choice1 = document.getElementById("choice1");
const choice2 = document.getElementById("choice2");
const choice3 = document.getElementById("choice3");
const chevron1 = document.getElementById("chevron1");
const chevron2 = document.getElementById("chevron2");
const chevron3 = document.getElementById("chevron3");
const sortButton = document.getElementById("sort__button");
const sortMenu = document.getElementById("sort__menu");
const sortButtonText = document.getElementById("sort__button__text");

//Adding events
choice1.addEventListener("click", sortingMenu1);
choice2.addEventListener("click", sortingMenu2);
choice3.addEventListener("click", sortingMenu3);
sortButton.addEventListener("click", openSort);
choice1.addEventListener("keyup", function(e) {
    if (e.key === 'Enter') {
        sortingMenu1();
    }
});
choice2.addEventListener("keyup", function(e) {
    if (e.key === 'Enter') {
        sortingMenu2();
    }
});
choice3.addEventListener("keyup", function(e) {
    if (e.key === 'Enter') {
        sortingMenu3();
    }
});
sortButton.addEventListener("keyup", function(e) {
    if (e.key === 'Enter') {
        openSort();
    }
});

//Functions
function openSort() {
    sortMenu.style.display = "block";
    sortButton.style.display = "none";
}

function sortingMenu1() {
    choice1.style.order = "-1";
    choice2.style.order = "0";
    choice3.style.order = "0";
    chevron1.style.display = "block";
    chevron2.style.display = "none";
    chevron3.style.display = "none";
    sortButtonText.innerText = "Popularité";
    sortMenu.style.display = "none";
    sortButton.style.display = "flex";
}

function sortingMenu2() {
    choice1.style.order = "0";
    choice2.style.order = "-1";
    choice3.style.order = "0";
    chevron1.style.display = "none";
    chevron2.style.display = "block";
    chevron3.style.display = "none";
    sortButtonText.innerText = "Date";
    sortMenu.style.display = "none";
    sortButton.style.display = "flex";
}

function sortingMenu3() {
    choice1.style.order = "0";
    choice2.style.order = "0";
    choice3.style.order = "-1";
    chevron1.style.display = "none";
    chevron2.style.display = "none";
    chevron3.style.display = "block";
    sortButtonText.innerText = "Titre";
    sortMenu.style.display = "none";
    sortButton.style.display = "flex";
}

function getPhotographer() {
    return fetch("data/photographers.json")
    .then(response => response.json())
    .then(function(data) {
        for (let i = 0; i < data.photographers.length; i++) {
            if (urlId == data.photographers[i].id) {
                photographerFactory(data.photographers[i]);
                break;
            }
        }
    });
}

function numberOfLikes() {
    let cpt = 0;
    const likecpt = document.createElement("p");
    const like = document.getElementsByClassName("like");
    fetch("data/photographers.json")
    .then(response => response.json())
    .then(function(data) {
        for (let i = 0; i < data.media.length; i++) {
            if (urlId == data.media[i].photographerId) {
                cpt+= data.media[i].likes;
            }
        }
        likecpt.textContent = cpt;
        like[0].appendChild(likecpt);
    });
}

getPhotographer();
numberOfLikes();