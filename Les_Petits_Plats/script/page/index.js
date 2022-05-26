const result = [];

if (result.length === 0) {
    displayCard();
}
function displayCard() {
    const cardContainer = document.querySelector("main");
    recipes.forEach((recipe) => {
        const card = document.createElement('article');
        card.classList.add('card__Recipes');
        card.innerHTML = `<a href="">
                            <img src="" alt=""></img>
                            <span class="card__title">${recipe.name}</span>
                            <span class="card__duration">${recipe.time} min</span>
                            <span class="card__ingredients">${recipe.ingredients[0].ingredient}</span>
                            <span class="card__recipe">${recipe.description}</span>
                        </a>`;
        cardContainer.appendChild(card);
    })

}