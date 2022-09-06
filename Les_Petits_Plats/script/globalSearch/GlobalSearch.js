export default class GlobalSearch {
    constructor(recipes) {
        this.recipes = recipes
        this.cardContainer = document.querySelector("main");
    }
    filterWithInput(options) {
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

    filterWithIngredients(data, options) {
        const resultsIngredient = new Set()
        for(let tag of options.ingredientsTagTab){
            
            const regex = new RegExp(tag.toLowerCase())
            data.forEach((recipe) => {
                recipe.ingredients.forEach((ingredient) => { 
                        if (!regex.test(ingredient.ingredient.toLowerCase())) {
                            resultsIngredient.delete(recipe)
                        }
                })  
            })
       
            options.results = resultsIngredient
        }
    }
    filterWithUstensils(data, options) {
        const resultsUstensil = new Set()
        for(let tag of options.ustensilsTagTab){
            // let data
            // options.results.size === 0 ? data = this.recipes : data = options.results
            const regex = new RegExp(tag.toLowerCase())
            data.forEach((recipe) => {
                recipe.ustensils.forEach((item) => { 
                    if (!regex.test(item.toLowerCase())) {
                        resultsUstensil.delete(recipe)
                    }
                })  
            })
        }
        options.results = resultsUstensil
    }
    filterWithAppliances(data, options) {
        const resultsAppliance = new Set()
        for(let tag of options.appliancesTagTab){
        //     let data
        // options.results.size === 0 ? data = this.recipes : data = options.results
            const regex = new RegExp(tag.toLowerCase())
            data.forEach((recipe) => {
                if (!regex.test(recipe.appliance.toLowerCase())) {
                    resultsAppliance.delete(recipe)
                }
            })
        }
        options.results = resultsAppliance
    }
    ultimateMatchesRecipes(options) {
        for(let option in options) {
            let data = this.recipes
            switch(option) {
                case 'input' :
                    if(options.input === "") {
                        options.results = this.recipes
                    } else {
                        this.filterWithInput(options)
                        data = options.results
                    }
                    
                break
                case 'ingredientsTagTab' :
                    if (options.ingredientsTagTab.size > 0) {
                       this.filterWithIngredients(data, options)
                    }
                break
                case 'ustensilsTagTab' :
                    if (options.ustensilsTagTab.size > 0) {
                        this.filterWithUstensils(data, options)
                    }
                break
                case 'appliancesTagTab' :
                    if (options.appliancesTagTab.size > 0) {
                        this.filterWithAppliances(data, options)
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
    displaysNoResult() {
        this.cardContainer.innerHTML = "";
        const message = document.createElement('p');
        message.textContent = "aucun résultat trouvé"
        this.cardContainer.appendChild(message);
    }
}