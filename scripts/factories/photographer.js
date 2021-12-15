function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/id_photos/${portrait}`;

    function getUserCardDOM() {
        //DOM elements
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' );
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
        linkBox.setAttribute("href", "");
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
    return { name, picture, getUserCardDOM };
}