let result = [];
const searchRecipe = document.querySelector('.search__recipe');

displayCard(recipes);
searchRecipe.addEventListener('input', findMatches);

function stringifyIngredients(ingredient, quantity = "", unit="") {
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
                            <div class="card__data">
                                <span class="card__title">${recipe.name}</span>
                                <span class="card__duration"><i class="far fa-clock"></i> ${recipe.time} min</span>
                                <div class="card__ingredients"></div>
                                <span class="card__recipe">${recipe.description}</span>
                            </div>
                        </a>`;
        cardContainer.appendChild(card);
        const divContainer = card.querySelector(".card__ingredients")
        
        recipe.ingredients.forEach((object) => {
            const inner =  stringifyIngredients(object.ingredient, object.quantity, object.unit)
            const containerIngredients = document.createElement('span')
            containerIngredients.classList.add("ingedient__span")
            containerIngredients.innerHTML = inner
            divContainer.appendChild(containerIngredients)
        })
    })
}

function findMatches(e) {
    result = []
    if (e.currentTarget.classList[0] === "search__recipe" && e.currentTarget.value.length < 3) {
        displayCard(recipes);
    } else if (e.currentTarget.classList[0] === "search__recipe" && e.currentTarget.value.length >= 3) {
        recipes.forEach(
            ()=> {
                result = recipes.filter(recipe => recipe.name.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) !== -1
                    || recipe.ingredients.map((item) => {return item.ingredient}).join(" ").toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) !== -1
                    || recipe.description.toLowerCase().indexOf(e.currentTarget.value.toLowerCase())!== -1
                )
                displayCard(result)
            }
        )    
    }
}
