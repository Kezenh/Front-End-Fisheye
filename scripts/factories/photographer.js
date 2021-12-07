function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/id_photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const location = document.createElement('p');
        location.textContent = city + ", " + country;
        const tag = document.createElement('p');
        tag.textContent = tagline;
        const cost = document.createElement('p');
        cost.textContent = price + "€/jour";
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(tag);
        article.appendChild(cost);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}