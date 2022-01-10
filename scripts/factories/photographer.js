function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    const picture = `assets/photographers/id_photos/${portrait}`;
    const href = new URL("/photographer.html?id=" + id,window.location.href);

    function getUserCard() {

        //DOM elements
        const article = document.createElement('article');
        const img = document.createElement('img');
        const h2 = document.createElement('h2');
        const location = document.createElement('p');
        const tag = document.createElement('p');
        const cost = document.createElement('p');
        const linkBox = document.createElement('a');
        const description = document.createElement('div');
        
        //Adding classes
        location.classList.add("location");
        tag.classList.add("tag");
        cost.classList.add("cost");

        //Adding attributes
        description.setAttribute("aria-label", name + "description");
        linkBox.setAttribute("href", href);
        linkBox.setAttribute("aria-label", name);
        img.setAttribute("src", picture);
        description.setAttribute("tabindex", "0");

        //Adding content
        h2.textContent = name;
        location.textContent = city + ", " + country;
        tag.textContent = tagline;
        cost.textContent = price + "€/jour";

        //Adding nodes
        description.appendChild(location);
        description.appendChild(tag);
        description.appendChild(cost);
        linkBox.appendChild(img);
        linkBox.appendChild(h2);
        article.appendChild(linkBox);
        article.appendChild(description);
        
        return (article);
    }

    function getPhotographerPage() {

        //DOM elements
        const photographBox = document.getElementById("photograph-header");
        const h2 = document.createElement("h2");
        const location = document.createElement('p');
        const tag = document.createElement('p');
        const img = document.createElement('img');
        const description = document.getElementById("description");
        const descriptionDetails = document.createElement("div");
        const details = document.getElementById("details");
        const cost = document.createElement("p");
        const like = document.createElement("div");
        const heart = document.createElement("svg");

        //Adding content
        h2.textContent = name;
        location.textContent = city + ", " + country;
        tag.textContent = tagline;
        cost.textContent = price + "€ / jour";
        heart.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" class="svg-inline--fa fa-heart fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>';

        //Adding classes
        location.classList.add("location");
        like.classList.add("mediaLike");
        heart.classList.add("heart");

        //Adding attributes
        img.setAttribute("src", picture);
        img.setAttribute("tabindex", 0);
        img.setAttribute("alt", "");
        h2.setAttribute("tabindex", 0 );
        h2.setAttribute("tabindex", 0 );
        descriptionDetails.setAttribute("tabindex", 0);
        details.setAttribute("tabindex", 0);

        //Adding nodes
        description.appendChild(h2);
        descriptionDetails.appendChild(location);
        descriptionDetails.appendChild(tag);
        description.appendChild(descriptionDetails);
        photographBox.appendChild(img);
        details.appendChild(like);
        details.appendChild(cost);
        like.appendChild(heart);
    }

    if(window.location.pathname == "/" || window.location.pathname == "/index.html") {
        return { getUserCard };
    } 

    else {
        return getPhotographerPage();
    }
}