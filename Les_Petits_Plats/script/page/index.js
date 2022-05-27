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
                            <div class="card__containerData">
                                <span class="card__title">${recipe.name}</span>
                                <span class="card__duration"><i class="far fa-clock"></i> ${recipe.time} min</span>
                                <div class="card__ingredients">${recipe.ingredients[0].ingredient}</div>
                                <span class="card__recipe">${recipe.description}</span>
                            </div>
                        </a>`;
        cardContainer.appendChild(card);
    })

}