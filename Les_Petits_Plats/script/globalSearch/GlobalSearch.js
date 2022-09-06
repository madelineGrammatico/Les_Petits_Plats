import tagFactory from "../factory/tagFactory.js";

export default class GlobalSearch {
    constructor(recipes, allSearch) {
        this.recipes = recipes
        console.log(allSearch)
        this.allIngredients = allSearch.allIngredients
        this.allAppliances = allSearch.allAppliances
        this.allUstensils = allSearch.allUstensils
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
        let resultsIngredient = new Set()
        console.log(data)
        for(let tag of options.ingredientsTagTab){
        
            const regex = new RegExp(tag.toLowerCase())
            data.forEach((recipe) => {
                console.log(recipe)
                for(let i=0 ; i< data.length; i++) {
                    if (regex.test(recipe.ingredients.ingredient.toLowerCase())) {
                        resultsIngredient.splice(i,1)
                    }

                }
                // recipe.ingredients.forEach((ingredient) => { 
                //         if (regex.test(ingredient.ingredient.toLowerCase())) {
                //             resultsIngredient.add(recipe)
                //         }
                // })  
            })
       
            options.results = resultsIngredient
        }
    }
    filterWithUstensils(data, options) {
        const resultsUstensil = this.allUstensils
        for(let tag of options.ustensilsTagTab){
            
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
        const resultsAppliance = this.allAppliances
        for(let tag of options.appliancesTagTab){
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
       let data 
        for(let option in options) {
           
            switch(option) {
                case 'input' :
                    if(options.input === "") {
                        data = this.recipes
                        options.results = [...this.recipes]
                    } else {
                        this.filterWithInput(options)
                        data = [...options.results]
                    }
                    
                break
                case 'ingredientsTagTab' :
                    if (options.ingredientsTagTab.size > 0) {
                       this.filterWithIngredients(data, options)
                       data = options.results
                    }
                break
                case 'ustensilsTagTab' :
                    if (options.ustensilsTagTab.size > 0) {
                        this.filterWithUstensils(data, options)
                        data = options.results
                    }
                break
                case 'appliancesTagTab' :
                    if (options.appliancesTagTab.size > 0) {
                        this.filterWithAppliances(data, options)
                        data = options.results
                    }
                break
            }
            
        }
        console.log(options)
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
    addListenerTag(tag, options) {
        
        tag.addEventListener('click', (e) => this.removeTag(e, options))
        return tag
    }
    removeTag(e, options) {
        const container = document.querySelector('.tag__container')
        let tag
        (e.target.classList[0] === "far" ) ? tag = e.target.parentNode : tag = e.target
        console.log(tag.classList[1])
        options.results = this.recipes
        switch(tag.classList[1]) {
            case 'tag--ingredient' :
                options.ingredientsTagTab.delete(tag.textContent)
            break
            case 'tag--ustensil' :
                options.ustensilsTagTab.delete(tag.textContent)
            break
            case 'tag--appliance' :
                options.appliancesTagTab.delete(tag.textContent)
            break
        }
        console.log(options)
        container.removeChild(tag)
        this.ultimateMatchesRecipes(options)
    }
    addSearchListener(e, options) {
        const object = tagFactory(e)
        const tag = object.displayTag(e, options)
        this.ultimateMatchesRecipes(options)
        this.addListenerTag(tag, options)
        
            
    }
}