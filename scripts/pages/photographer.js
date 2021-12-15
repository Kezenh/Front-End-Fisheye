const queryString = window.location.search;
const urlId = new URLSearchParams(queryString).get("id");

function getPhotographer() {
    
    fetch("data/photographers.json")
    .then(response => response.json())
    .then(function(data) {
        for (let i = 0; i < data.photographers.length; i++) {
            if (urlId == data.photographers[i].id) {
                window.alert(data.photographers[i].name + " " + data.photographers[i].id + " " + data.photographers[i].city + " " + data.photographers[i].country + " " + data.photographers[i].tagline + " " + data.photographers[i].portrait + " " + data.photographers[i].price);
                break;
            }
        }
    });
}

getPhotographer();