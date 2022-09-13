export default function globalSearch(recipes) {
    // constructor() {
    //     matchesRecipes = this.matchesRecipes.bind(this)
    // }
    const cardContainer = document.querySelector('main')
    const ingredientsDiv = document.querySelector('.ingrédient__tag')
    const appliancesDiv = document.querySelector('.appliance__tag')
    const ustensilsDiv = document.querySelector('.ustensil__tag')

    function filterWithInput(options) {
        const regex = new RegExp(options.input.toLowerCase())
        options.results = recipes.filter(recipe => 
            (regex.test(recipe.name.toLowerCase())
            ||recipe.ingredients.forEach((item) => regex.test(item.ingredient.toLowerCase()))
            ||regex.test(recipe.description.toLowerCase())) 
            
        )
    
    }

    function filterWithIngredients(data, options) {
        for(let recipe of data) {
            let isValid = false
            for(let tag of options.ingredientsTagTab){
                let isTagValid = false
                let i = 0
                for(i ; i < recipe.ingredients.length; i++) {
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
    function filterWithUstensils(data, options) {
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
    function filterWithAppliances(data, options) {
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

    function matchesRecipes(options) {
        let data = new Set()
        console.log('hey')
        for(let option in options) {
            switch(option) {
                case 'input' :
                    if(options.input === "") {
                        for(let result of this.recipes) {
                            data.add(result)
                        }
                        options.results = [...this.recipes]
                    } else {
                        filterWithInput(options)
                        for(let result of options.results) {
                            data.add(result)
                        }
                    }
                    
                break
                case 'ingredientsTagTab' :
                    if (options.ingredientsTagTab.size > 0) {
                       filterWithIngredients(data, options)
                       for(let result of options.results) {
                        data.add(result)
                    }
                    }
                break
                case 'ustensilsTagTab' :
                    if (options.ustensilsTagTab.size > 0) {
                        filterWithUstensils(data, options)
                        for(let result of options.results) {
                            data.add(result)
                        }
                    }
                break
                case 'appliancesTagTab' :
                    if (options.appliancesTagTab.size > 0) {
                        filterWithAppliances(data, options)
                        
                    }
                break
            }
            
        }
        displayRecipes(options.results)
        return {options}
    }

    function stringifyIngredients(ingredient, quantity = "", unit="") {
        return `${ingredient} : ${quantity} ${unit}`
    }

    function displayRecipes(results) {
        cardContainer.innerHTML = "";
        for(let recipe of results) {
            const card = document.createElement('article');
            card.classList.add('card__Recipes');
            card.innerHTML = `<a href="">
                                <img class="card__img" src="" alt=""></img>
                                <div class="card__data">
                                    <span class="card__title">${recipe.name}</span>
                                    <span class="card__duration"><img class="icone i--time" src="./asset/minuteur.svg" ></img> ${recipe.time} min</span>
                                    <div class="card__ingredients"></div>
                                    <span class="card__recipe">${recipe.description}</span>
                                </div>
                            </a>`;
            cardContainer.appendChild(card);
            const divContainer = card.querySelector(".card__ingredients")
            
            for(let object of recipe.ingredients) {
                const inner = stringifyIngredients(object.ingredient, object.quantity, object.unit)
                const containerIngredients = document.createElement('span')
                containerIngredients.classList.add("ingedient__span")
                containerIngredients.innerHTML = inner
                divContainer.appendChild(containerIngredients)
            }
        }
    }
    return {
        matchesRecipes, displayRecipes
    }
}