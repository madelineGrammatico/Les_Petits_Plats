import tagFactory from "../factory/tagFactory.js";
import IngredientsAdvSearch from "../search/IngredientsAdvSearch.js";
import AppliancesAdvSearch from "../search/AppliancesAdvSearch.js";
import UstensilsAdvSearch from "../search/UstensilsAdvSearch.js";

export default class GlobalSearch {
    constructor(recipes) {
        this.recipes = recipes
        this.cardContainer = document.querySelector("main");
        this.ingredientsDiv = document.querySelector('.ingredient__tag')
        this.appliancesDiv = document.querySelector('.appliance__tag')
        this.ustensilsDiv = document.querySelector('.ustensil__tag')
        this.ingredientSearch = new IngredientsAdvSearch(recipes)
        this.applianceSearch = new AppliancesAdvSearch(recipes)
        this.ustensilSearch = new UstensilsAdvSearch(recipes)
    }
    displaySearch (searchsTagTab, searchDiv, options) {
        searchDiv.innerHTML = ""
        searchsTagTab.forEach((ingredient)=> {
            let tag = document.createElement("span")
            tag.classList.add("searchTag")
            tag.innerHTML = ingredient
            const newTag = searchDiv.appendChild(tag)
           
            newTag.addEventListener("click", (e) => {
                this.addSearchListener(e, options)
                this.displayAdvencedSearchs(options)
            }  )
        })
    }
    
    displayIngredientSearchs(options) {
        const ingredientsList = this.ingredientSearch.addSearchIngredients(options)
        this.displaySearch(ingredientsList, this.ingredientsDiv, options)
    }
    displayApplianceSearchs(options) {
        const appliancesList = this.applianceSearch.addSearchAppliances(options)
        this.displaySearch(appliancesList, this.appliancesDiv, options)
    }
    displayUstensilSearchs(options) {
        const ustensilsList = this.ustensilSearch.addSearchUstensils(options)
        this.displaySearch(ustensilsList, this.ustensilsDiv, options)
    }
    
    displayAdvencedSearchs(options) {
        this.displayIngredientSearchs(options)
        this.displayApplianceSearchs(options)
        this.displayUstensilSearchs(options)
    }

    //===================================================================================
    //===================================================================================

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
        for(let recipe of data) {
            let isValid = false
            for(let tag of options.ingredientsTagTab){
                let isTagValid = false
                let i = 0
                for (i ; i < recipe.ingredients.length; i++) {
                    const regex = new RegExp(tag.toLowerCase())
                    if (regex.test(recipe.ingredients[i].ingredient.toLowerCase())) {
                        isTagValid = true
                    }
                }
                if (isTagValid) { isValid = true } 
                else { 
                    isValid = false
                    break
                }
            }
            if (isValid === false) { data.delete(recipe) } 
        }
        options.results = data
    }
    filterWithUstensils(data, options) {
        for(let recipe of data) {
            let isValid = false
            for(let tag of options.ustensilsTagTab){
                let isTagValid = false
                let i= 0
                for(i; i < recipe.ustensils.length; i++){
                    const regex = new RegExp(tag.toLowerCase())
                    if (regex.test(recipe.ustensils[i].toLowerCase())) {
                        isTagValid = true
                    }
                }
                if (isTagValid) {isValid = true}
                else { 
                    isValid = false
                    break
                }
            }
            if (isValid === false) {data.delete(recipe)}
            
        }
        options.results = data
    }
    filterWithAppliances(data, options) {
        for(let recipe of data) {
            let isValid = false
            for(let tag of options.appliancesTagTab){
                let isTagValid
                const regex = new RegExp(tag.toLowerCase())
                if (regex.test(recipe.appliance.toLowerCase())) {
                    isTagValid = true
                }
                if(isTagValid) isValid = true
                else {
                    isValid = false
                    break
                }
            }
            if (isValid === false) {data.delete(recipe)}
        }
        options.results = data
    }
    
    ultimateMatchesRecipes(options) {
       let data = new Set()
        for(let option in options) {
            switch(option) {
                case 'input' :
                    if(options.input === "") {
                        for(let result of this.recipes) {
                            data.add(result)
                        }
                        options.results = [...this.recipes]
                    } else {
                        this.filterWithInput(options)
                        for(let result of options.results) {
                            data.add(result)
                        }
                    }
                    
                break
                case 'ingredientsTagTab' :
                    if (options.ingredientsTagTab.size > 0) {
                       this.filterWithIngredients(data, options)
                       for(let result of options.results) {
                        data.add(result)
                    }
                    }
                break
                case 'ustensilsTagTab' :
                    if (options.ustensilsTagTab.size > 0) {
                        this.filterWithUstensils(data, options)
                        for(let result of options.results) {
                            data.add(result)
                        }
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

    //===================================================================================
    //===================================================================================
    
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

    //===================================================================================
    //===================================================================================

    addSearchListener(e, options) {
        const object = tagFactory(e)
        const tag = object.displayTag(e, options)
        this.ultimateMatchesRecipes(options)
        this.addListenerTag(tag, options)
        
            
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
        container.removeChild(tag)
        this.ultimateMatchesRecipes(options)
        this.displayAdvencedSearchs(options)
    }

}
