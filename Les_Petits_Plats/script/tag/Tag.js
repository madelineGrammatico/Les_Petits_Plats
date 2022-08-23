export default class Tag {
    constructor() {
        this.container = document.querySelector('.tag__container')
        this.cardContainer = document.querySelector("main");
        this.searchTab = ""
    }
    clearContainer() {
        this.cardContainer.innerHTML = "";
    }
    #stringifyIngredients(ingredient, quantity = "", unit="") {
        return `${ingredient} : ${quantity} ${unit}`
    }
    createTag(value, options) {
        const tag = document.createElement("span")
        tag.classList.add("activeTag")
        const tagContent = value
        tag.innerHTML = tagContent + "<i class='far fa-times-circle'></i>"
        this.container.appendChild(tag)
        tag.addEventListener('click', (e) => this.removeTag(e, options))
        return tag
    }

    removeTag(e, options) {
       console.log(options)
        // options.`${this.searchTab}`.delete(e.target.textContent)
        let searchType
        let tag
        (e.target.classList[0] === "far" ) ? tag = e.target.parentNode : tag = e.target
        console.log(tag.classList[1])
        switch(tag.classList[1]) {
            case 'tag--ingredient' :
                options.ingredientsTagTab.delete(e.target.textContent)
                searchType = "ingredient"
            break
            case 'tag--ustensil' :
                options.ustensilsTagTab.delete(e.target.textContent)
                searchType = "ustensil"
            break
            case 'tag--appliance' :
                options.apliancesTagTab.delete(e.target.textContent)
                searchType = "appliance"
            break
        }
        this.container.removeChild(tag)
        this.matchsRecipes(options, searchType)
    }

    matchsRecipes(options, searchType, value = options.input) {
        console.log(value)
        const results = []
        const valueRegex = new RegExp(value.toLowerCase())
        switch(searchType) {
            case 'ingredient' : 
                options.results.forEach((recipe) => {
                    recipe.ingredients.forEach((item) => { 
                        if (valueRegex.test(item.ingredient.toLowerCase())) {
                            results.push(recipe)
                        }
                    })  
                })
            break
            case 'ustensil' : 
                options.results.forEach((recipe) => {
                    recipe.ingredients.forEach((item) => { 
                        if (valueRegex.test(item.ingredient.toLowerCase())) {
                            results.push(recipe)
                        }
                    })  
                })
            break
            case 'appliance' :
                options.results.forEach((recipe) => {
                    recipe.ingredients.forEach((item) => { 
                        if (valueRegex.test(item.ingredient.toLowerCase())) {
                            results.push(recipe)
                        }
                    })  
                })
            break

        }
        
        options.results = results
        this.displayRecipes(options.results)
        return options
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