let result = [];
const searchRecipe = document.querySelector('.search__recipe');

displayCard(recipes);
searchRecipe.addEventListener('input', findMatches);

function stringifyIngredient(ingredient, quantity, unit) {
    return `${ingredient} : ${quantity} ${unit}`
}

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
                            <div class="card__ingredients"></div>
                            <span class="card__recipe">${recipe.description}</span>
                        </a>`;
        cardContainer.appendChild(card);
        const ingredientWrapper = cardContainer.querySelector(".card__ingredients")
        recipe.ingredients.forEach((object) => {
            const ingredientContainer = document.createElement("span")
            ingredientContainer.classList = "card__ingredient__span"
            const inner = stringifyIngredient(object.ingredient, object.quantity, object.unit)
            ingredientContainer.innerHTML = inner
            ingredientWrapper.appendChild(ingredientContainer);
        })
    })
}

function findMatches(e) {
    result = []
    if (e.currentTarget.classList[0] === "search__recipe" && e.currentTarget.value.length < 3) {
        displayCard(recipes);
    } else if (e.currentTarget.classList[0] === "search__recipe" && e.currentTarget.value.length >= 3) {
        recipes.forEach((recipe)=> {
            if (recipe.name.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) !== -1) {
                result.push(recipe)
            }
            displayCard(result)
        })
            
    }
}
