export default class MainSearch  {
    constructor(recipes) {
      
        this.recipes = recipes
        this.cardContainer = document.querySelector("main");
    }
    clearContainer() {
        this.cardContainer.innerHTML = "";
    }

    #stringifyIngredients(ingredient, quantity = "", unit="") {
            return `${ingredient} : ${quantity} ${unit}`
    }

    displayRecipes(data = this.recipes){
        this.clearContainer()
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
            this.cardContainer.appendChild(card);
            const divContainer = card.querySelector(".card__ingredients")
            
            recipe.ingredients.forEach((object) => {
                const inner = this.#stringifyIngredients(object.ingredient, object.quantity, object.unit)
                const containerIngredients = document.createElement('span')
                containerIngredients.classList.add("ingedient__span")
                containerIngredients.innerHTML = inner
                divContainer.appendChild(containerIngredients)
            })
        })
    }
    
    matchsRecipes(value) {
        const result = []
        const regex = new RegExp(value.toLowerCase())
        this.recipes.forEach((recipe) => {
            if (regex.test(recipe.name.toLowerCase())
            ||recipe.ingredients.forEach((item) => regex.test(item.ingredient.toLowerCase()))
            ||regex.test(recipe.description.toLowerCase())) {
                result.push(recipe)
            }
        })
        return result
    }

    displaysNoResult() {
        this.clearContainer();
        const message = document.createElement('p');
        message.textContent = "aucun résultat trouvé"
        this.cardContainer.appendChild(message);
    }
}