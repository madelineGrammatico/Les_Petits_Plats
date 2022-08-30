export default class GlobalSearch {
    constructor(recipes) {
        this.recipes = recipes
    }
    ultimateMatchesRecipes(options) {
       console.log(options)
        for(let option in options) {
            
            switch(option) {
                case 'input' :
                    if(options.input !== "") {
                        
                        const resultsInput = new Set()
                        const regex = new RegExp(options.input.toLowerCase())
                        for(let recipe of this.recipes) {
                            if (regex.test(recipe.name.toLowerCase())
                            ||recipe.ingredients.forEach((item) => regex.test(item.ingredient.toLowerCase()))
                            ||regex.test(recipe.description.toLowerCase())) {
                                resultsInput.add(recipe)
                            }
                        }
                        options.results = resultsInput
                    }
                break
                case 'ingredientsTagTab' :
                    if (options.ingredientsTagTab.size > 0) {
                        const resultsIngredient = new Set()
                        for(let tag of options.ingredientsTagTab){
                            let data
                            options.results.size == 0 ? data = this.recipes : data = options.results
                            const regex = new RegExp(tag.toLowerCase())
                            data.forEach((recipe) => {
                                recipe.ingredients.forEach((ingredient) => { 
                                        if (regex.test(ingredient.ingredient.toLowerCase())) {
                                            resultsIngredient.add(recipe)
                                        }
                                })  
                            })
                       
                            options.results = resultsIngredient
                        }
                        
                    }
                break
                case 'ustensilsTagTab' :
                    if (options.ustensilsTagTab.size > 0) {
                        const resultsUstensil = new Set()
                        for(let tag of options.ustensilsTagTab){
                            let data
                            options.results.size === 0 ? data = this.recipes : data = options.results
                            const regex = new RegExp(tag.toLowerCase())
                            data.forEach((recipe) => {
                                recipe.ustensils.forEach((item) => { 
                                    if (regex.test(item.toLowerCase())) {
                                        resultsUstensil.add(recipe)
                                    }
                                })  
                            })
                        }
                        options.results = resultsUstensil
                    }
                break
                case 'appliancesTagTab' :
                    if (options.appliancesTagTab.size > 0) {
                        console.log('applianceTagTab')
                        const resultsAppliance = new Set()
                        for(let tag of options.appliancesTagTab){
                            let data
                        options.results.size === 0 ? data = this.recipes : data = options.results
                            const regex = new RegExp(tag.toLowerCase())
                            data.forEach((recipe) => {
                                if (regex.test(recipe.appliance.toLowerCase())) {
                                    resultsAppliance.push(recipe)
                                }
                            })
                        }
                        options.results = resultsAppliance
                    }
                break
            }
            
        }
        
        this.displayRecipes(options.results)
        return options.results
        
    }
    #stringifyIngredients(ingredient, quantity = "", unit="") {
        return `${ingredient} : ${quantity} ${unit}`
    }

    displayRecipes(results) {
        this.clearContainer()
        this.cardContainer.innerHTML = "";
        results.forEach((recipe) => {
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
}