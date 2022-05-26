let result = [];
const searchRecipe = document.querySelector('.search__recipe');

displayCard(recipes);
searchRecipe.addEventListener('input', findMatches);

function displayCard(data) {
    const cardContainer = document.querySelector("main");
    console.log(cardContainer);
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
