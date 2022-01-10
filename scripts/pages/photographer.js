const queryString = window.location.search;
const urlId = new URLSearchParams(queryString).get("id");
let sort = 1;

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
    popularity();
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
    date();
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
    title();
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

async function numberOfLikes() {
    let cpt = 0;
    return fetch("data/photographers.json")
    .then(response => response.json())
    .then(function(data) {
        for (let i = 0; i < data.media.length; i++) {
            if (urlId == data.media[i].photographerId) {
                cpt+= data.media[i].likes;
            }
        }
        return cpt;
    });
}

async function getMedias() {
    let arr = [];
    return fetch("data/photographers.json")
    .then(response => response.json())
    .then(function(data) {
        for (let i = 0; i < data.media.length; i++) {
            if (urlId == data.media[i].photographerId) {
                arr.push(data.media[i]);
            }
        }
        return arr;
    });
}

function sortMediasbyPopularity(medias) {
    medias.sort(function (a,b) {
        return b.likes - a.likes;
    });
    return medias;
}

function sortMediasbyDate(medias) {
    medias.sort(function (a,b) {
        return a.date.localeCompare(b.date);
    });
    return medias;
}

function sortMediasbyTitle(medias) {
    medias.sort(function (a,b) {
        if (a.hasOwnProperty("title")) {
            if (b.hasOwnProperty("title")) {
                return a.title.localeCompare(b.title);
            } else {
                return a.title.localeCompare(b.video.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").replace(/mp4/g,""));
            }
        } else if (b.hasOwnProperty("title")) {
            return a.video.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").replace(/mp4/g,"").localeCompare(b.title);
        } else {
            return a.video.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").replace(/mp4/g,"").localeCompare(b.video.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").replace(/mp4/g,""));
        }    
    });
    return medias;
}

async function initMedias() {
    medias = await getMedias();
    medias = sortMediasbyPopularity(medias);
    displayMedias(medias);
    let likes = await numberOfLikes();
    const mediaLike = document.getElementsByClassName("mediaLike");
    const likeBox = document.createElement("p");
    likeBox.id = "likeBox";
    likeBox.innerText = likes;
    likeBox.style.order = "-1";
    mediaLike[0].appendChild(likeBox);
}

async function popularity() {
    if (sort != 1) {
        sort = 1;
        document.getElementById("album__pictures").innerHTML = "";
        medias = await getMedias();
        medias = sortMediasbyPopularity(medias);
        displayMedias(medias);
    }
}

async function date() {
    if (sort != 2) {
        sort = 2;
        document.getElementById("album__pictures").innerHTML = "";
        medias = await getMedias();
        medias = sortMediasbyDate(medias);
        displayMedias(medias);
    }
}

async function title() {
    if (sort != 3) {
        sort = 3;
        document.getElementById("album__pictures").innerHTML = "";
        medias = await getMedias();
        medias = sortMediasbyTitle(medias);
        displayMedias(medias);
    }
}

async function displayMedias(medias) {
    for (let i = 0; i < medias.length; i++) {
        await displayMedia(medias[i]);
    }
}

async function displayMedia(media) {

    let thumbSrc = "";
    let likes = 0;

    if (media.hasOwnProperty("image")) {
        thumbSrc = "/assets/photographers/" + await getName(urlId) + "/" + media.image;
    } else {
        thumbSrc = "/assets/photographers/" + await getName(urlId) + "/" + media.video;
    }

    //DOM Elements
    const albumPictures = document.getElementById("album__pictures");
    const mediaCard = document.createElement("div");
    const mediaDescription = document.createElement("div");
    const h2 = document.createElement("h2");
    let thumb;
    if (media.hasOwnProperty("image")) {
        thumb = document.createElement("img");
    } else {
        thumb = document.createElement("video");
    }
    const like = document.createElement("div");
    const likeCpt = document.createElement("p");
    const heart1 = document.createElement("svg");
    const heart2 = document.createElement("svg");

    //Adding Content
    if (media.hasOwnProperty("title")) {
        h2.textContent = media.title;
    } else {
        h2.textContent = media.video.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").replace(/mp4/g,"");
    }
    likeCpt.textContent = media.likes;
    heart1.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" class="heart1 heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>'; 
    heart2.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" class="heart2 heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>'; 


    //Adding Classes
    mediaDescription.classList.add("mediaDescription");
    mediaCard.classList.add("mediaCard");
    thumb.classList.add("mediaImg");
    like.classList.add("mediaLike");

    //Adding Attributes
    thumb.setAttribute("src", thumbSrc);
    heart1.style.display = "block";
    heart2.style.display = "none";

    //Adding Nodes
    like.appendChild(likeCpt);
    like.appendChild(heart1);
    like.appendChild(heart2);
    mediaDescription.appendChild(h2);
    mediaDescription.appendChild(like);
    mediaCard.appendChild(thumb);
    mediaCard.appendChild(mediaDescription);
    albumPictures.appendChild(mediaCard);

    //Adding Events
    heart1.addEventListener("click", addLike);
    heart2.addEventListener("click", lessenLike);

    function addLike() {
        heart1.style.display = "none";
        heart2.style.display = "block";
        const likeBox = document.getElementById("likeBox");
        likeBox.innerText = parseInt(likeBox.textContent) + 1;
        likeCpt.innerText = parseInt(likeCpt.textContent) + 1;
    }

    function lessenLike() {
        heart1.style.display = "block";
        heart2.style.display = "none";
        const likeBox = document.getElementById("likeBox");
        likeBox.innerText = parseInt(likeBox.textContent) - 1;
        likeCpt.innerText = parseInt(likeCpt.textContent) - 1;
    }
}

async function getName(id) {
    return fetch("./../data/photographers.json")
    .then(response => response.json())
    .then(function(data) {
        for (let i = 0; i < data.photographers.length; i++) {
            if (data.photographers[i].id == id) {
                return data.photographers[i].name;
            }
        }
    });
}

getPhotographer();
initMedias();