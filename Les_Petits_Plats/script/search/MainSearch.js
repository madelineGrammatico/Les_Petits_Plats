export default class MainSearch {
    constructor() {
        this.handlerDisplayResult = this.displayResult.bind(this)
    }
    clearContainer() {
        const cardContainer = document.querySelector("main");
        cardContainer.innerHTML = "";
    }

    stringifyIngredients(ingredient, quantity = "", unit="") {
            return `${ingredient} : ${quantity} ${unit}`
        }
    

    displaycard() {

    }

    displayAllRecipes(data){
        const cardContainer = document.querySelector("main");
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
                const inner = this.stringifyIngredients(object.ingredient, object.quantity, object.unit)
                const containerIngredients = document.createElement('span')
                containerIngredients.classList.add("ingedient__span")
                containerIngredients.innerHTML = inner
                divContainer.appendChild(containerIngredients)
            })
        })
    }
    displayResult(recipes, value) {
        const regex = new RegExp(value.toLowerCase())
        console.log(regex)
       
        recipes.forEach((recipe) => {
    
            if (regex.test(recipe.name.toLowerCase())
            ||recipe.ingredients.forEach((item) => regex.test(item.ingredient.toLowerCase()))
            ||regex.test(recipe.description.toLowerCase())) {console.log(recipe)}
        })
    }

    

}