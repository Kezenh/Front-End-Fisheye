import { photographerFactory } from "../factories/photographer.js";
import { displayContactModal } from "../utils/contactForm.js";
import { closeContactModal } from "../utils/contactForm.js";

const queryString = window.location.search;
const urlId = new URLSearchParams(queryString).get("id");
let sort = 1;
let medias = [];
let photographerName = "";
let cpt = 0;
let actualMedia = 0;

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
document.getElementById("openContact").addEventListener("click", displayContactModal);
document.getElementById("closeContact").addEventListener("click", closeContactModal);
document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowRight") {
        goToNextMedia();
    }
    if (e.key === "ArrowLeft") {
        goToPreviousMedia();
    }
    if (e.key === "Escape") {
        closeLightbox();
    }
});
document.getElementById("right-arrow").addEventListener("click", goToNextMedia);
document.getElementById("right-arrow").addEventListener("keyup", function(e) {
    if (e.key === 'Enter') {
        goToNextMedia();
    }
});
document.getElementById("left-arrow").addEventListener("click", goToPreviousMedia);
document.getElementById("left-arrow").addEventListener("keyup", function(e) {
    if (e.key === 'Enter') {
        goToPreviousMedia();
    }
});
choice1.addEventListener("click", sortMenuByPopularity);
choice2.addEventListener("click", sortMenuByDate);
choice3.addEventListener("click", sortMenuByTitle);
sortButton.addEventListener("click", openSortingMenu);
choice1.addEventListener("keyup", function(e) {
    if (e.key === 'Enter') {
        sortMenuByPopularity();
    }
});
choice2.addEventListener("keyup", function(e) {
    if (e.key === 'Enter') {
        sortMenuByDate();
    }
});
choice3.addEventListener("keyup", function(e) {
    if (e.key === 'Enter') {
        sortMenuByTitle();
    }
});
sortButton.addEventListener("keyup", function(e) {
    if (e.key === 'Enter') {
        openSortingMenu();
    }
});

//Functions
function openSortingMenu() {
    sortMenu.style.display = "block";
    sortButton.style.display = "none";
}

function sortMenuByPopularity() {
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

function sortMenuByDate() {
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

function sortMenuByTitle() {
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

async function getPhotographerDatas() {
    initMedias();
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

async function getTotalNumberOfLikes() {
    let cptLikes = 0;
    return fetch("data/photographers.json")
    .then(response => response.json())
    .then(function(data) {
        for (let i = 0; i < data.media.length; i++) {
            if (urlId == data.media[i].photographerId) {
                cptLikes+= data.media[i].likes;
            }
        }
        return cptLikes;
    });
}

async function getPhotosAndVideos() {
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
        // eslint-disable-next-line no-prototype-builtins
        if (a.hasOwnProperty("title")) {
            // eslint-disable-next-line no-prototype-builtins
            if (b.hasOwnProperty("title")) {
                return a.title.localeCompare(b.title);
            } else {
                // eslint-disable-next-line no-useless-escape
                return a.title.localeCompare(b.video.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").replace(/mp4/g,""));
            }
        // eslint-disable-next-line no-prototype-builtins
        } else if (b.hasOwnProperty("title")) {
            // eslint-disable-next-line no-useless-escape
            return a.video.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").replace(/mp4/g,"").localeCompare(b.title);
        } else {
            // eslint-disable-next-line no-useless-escape
            return a.video.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").replace(/mp4/g,"").localeCompare(b.video.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").replace(/mp4/g,""));
        }    
    });
    return medias;
}

async function initMedias() {
    photographerName = await getPhotographerName(urlId);
    medias = await getPhotosAndVideos();
    medias = sortMediasbyPopularity(medias);
    displayMedias(medias);
    let likes = await getTotalNumberOfLikes();
    const mediaLike = document.getElementsByClassName("mediaLike");
    const likeBox = document.createElement("p");
    likeBox.id = "likeBox";
    likeBox.innerText = likes;
    likeBox.style.order = "-1";
    mediaLike[0].appendChild(likeBox);
    document.getElementById("contact_modal").setAttribute("aria-label", "Contact me " + photographerName);
}

async function popularity() {
    if (sort != 1) {
        sort = 1;
        document.getElementById("album__pictures").innerHTML = "";
        medias = await getPhotosAndVideos();
        medias = sortMediasbyPopularity(medias);
        cpt = 0;
        displayMedias(medias);
    }
}

async function date() {
    if (sort != 2) {
        sort = 2;
        document.getElementById("album__pictures").innerHTML = "";
        medias = await getPhotosAndVideos();
        medias = sortMediasbyDate(medias);
        cpt = 0;
        displayMedias(medias);
    }
}

async function title() {
    if (sort != 3) {
        sort = 3;
        document.getElementById("album__pictures").innerHTML = "";
        medias = await getPhotosAndVideos();
        medias = sortMediasbyTitle(medias);
        cpt = 0;
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
    const mediaNumber = cpt;

    // eslint-disable-next-line no-prototype-builtins
    if (media.hasOwnProperty("image")) {
        thumbSrc = "/assets/photographers/" + photographerName + "/" + media.image;
    } else {
        thumbSrc = "/assets/photographers/" + photographerName + "/" + media.video;
    }

    //DOM Elements
    const albumPictures = document.getElementById("album__pictures");
    const mediaCard = document.createElement("div");
    const mediaDescription = document.createElement("div");
    const h2 = document.createElement("h2");
    let thumb;
    // eslint-disable-next-line no-prototype-builtins
    if (media.hasOwnProperty("image")) {
        thumb = document.createElement("img");
    } else {
        thumb = document.createElement("video");
    }
    const like = document.createElement("div");
    const likeCpt = document.createElement("p");
    const heart1 = document.createElement("svg");
    const heart2 = document.createElement("svg");
    let title = "";

    //Adding Content
    // eslint-disable-next-line no-prototype-builtins
    if (media.hasOwnProperty("title")) {
        title = media.title;
    } else {
        // eslint-disable-next-line no-useless-escape
        title = media.video.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").replace(/mp4/g,"");
    }
    h2.textContent = title;
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
    thumb.setAttribute("tabindex", 0);
    heart1.setAttribute("tabindex", 0);
    heart2.setAttribute("tabindex", 0);
    thumb.setAttribute("aria-label", "Agrandir" + title);
    heart1.setAttribute("aria-label", "Ajouter un like, actuellement" + likeCpt.textContent + "likes");
    heart2.setAttribute("aria-label", "Enlever votre like, actuellement" + likeCpt.textContent + "likes");
    thumb.style.cursor = "pointer";

    //Adding Nodes
    like.appendChild(likeCpt);
    like.appendChild(heart1);
    like.appendChild(heart2);
    mediaDescription.appendChild(h2);
    mediaDescription.appendChild(like);
    mediaCard.appendChild(thumb);
    mediaCard.appendChild(mediaDescription);
    albumPictures.appendChild(mediaCard);

    cpt++;

    //Adding Events
    heart1.addEventListener("click", addLike);
    heart2.addEventListener("click", lessenLike);
    heart1.addEventListener("keyup", function(e) {
        if (e.key === 'Enter') {
            addLike();
        }
    });
    heart2.addEventListener("keyup", function(e) {
        if (e.key === 'Enter') {
            lessenLike();
        }
    });
    thumb.addEventListener("click", openLightbox);
    thumb.addEventListener("keyup", function(e) {
        if (e.key === 'Enter') {
            openLightbox();
        }
    });

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

    function openLightbox() {
        actualMedia = mediaNumber;
        const lightboxModal = document.getElementById("lightbox-modal");
        const main = document.getElementById("main");
        const media = document.getElementById("media");
        const header = document.getElementById("header");
        lightboxModal.focus();
        if (media !== undefined && media !== null) {
            media.parentNode.removeChild(media);
        }
        lightbox(medias[actualMedia]);
        lightboxModal.style.display = "flex";
        main.style.display = "none";
        header.style.display = "none";
    }
}

function goToNextMedia() {
    const media = document.getElementById("media");
    if (media !== undefined && media !== null) {
        media.parentNode.removeChild(media);
    }
    if (actualMedia < medias.length - 1) {
        lightbox(medias[actualMedia + 1]);
        actualMedia++;
    } else {
        lightbox(medias[0]);
        actualMedia = 0;
    }
}

function goToPreviousMedia() {
    const media = document.getElementById("media");
    if (media !== undefined && media !== null) {
        media.parentNode.removeChild(media);
    }
    if (actualMedia != 0) {
        lightbox(medias[actualMedia - 1]);
        actualMedia--;
    } else {
        lightbox(medias[medias.length - 1]);
        actualMedia = medias.length - 1;
    }
}

document.getElementById("close").addEventListener("click", closeLightbox);
document.getElementById("close").addEventListener("keyup", function(e) {
    if (e.key === 'Enter') {
        closeLightbox();
    }
});

function closeLightbox() {
    const lightboxModal = document.getElementById("lightbox-modal");
    const main = document.getElementById("main");
    const header = document.getElementById("header");
    lightboxModal.style.display = "none";
    main.style.display = "block";
    header.style.display = "flex";
}

async function getPhotographerName(id) {
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

function lightbox(data) {
    const mediaTitle = document.getElementById("media-title");
    const mediaContainer = document.getElementById("media-container");
    let media = "";
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty("image")) {
        media = document.createElement("img");
    } else {
        media = document.createElement("video");
    }
    media.id = "media";
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty("image")) {
        media.setAttribute("src", "/assets/photographers/" + photographerName + "/" + data.image);
        mediaTitle.textContent = data.title;
    } else {
        media.setAttribute("src", "/assets/photographers/" + photographerName + "/" + data.video);
        media.setAttribute("type", "video/mp4");
        media.setAttribute("controls", "");
        // eslint-disable-next-line no-useless-escape
        mediaTitle.textContent = data.video.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").replace(/mp4/g,"");
    }
    mediaContainer.appendChild(media);
}

getPhotographerDatas();