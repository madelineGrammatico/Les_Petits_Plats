let result = [];
const searchRecipe = document.querySelector('.search__recipe');

displayCard(recipes);
searchRecipe.addEventListener('input', findMatches);

function displayCard(data) {
    const cardContainer = document.querySelector("main");
    cardContainer.innerHTML = "";
    data.forEach((recipe) => {
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

function findMatches(e) {
    if (e.currentTarget.classList[0] === "search__recipe" && e.currentTarget.value.length < 3) {
        displayCard(recipes);
    } else if (e.currentTarget.classList[0] === "search__recipe" && e.currentTarget.value.length >= 3) {
        result = recipes.filter(recipe => recipe.name.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) !== -1
            || recipe.ingredients.map((item) => {return item.ingredient}).join(" ").toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) !== -1
            || recipe.description.toLowerCase().indexOf(e.currentTarget.value.toLowerCase())!== -1
        )
        displayCard(result)       
    }
}
