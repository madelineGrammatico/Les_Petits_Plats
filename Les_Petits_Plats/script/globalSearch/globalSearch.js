import createNewTag from "../factory/tagFactory.js";

import appliancesAdvSearch from "../advencedSearch/appliancesAdvSearch.js";
import ingredientsAdvSearch from "../advencedSearch/ingredientsAdvSearch.js";
import ustensilsAdvSearch from "../advencedSearch/ustensilsAdvSearch.js";

export default function globalSearch(recipes) {
    const cardContainer = document.querySelector('main')
    const ingredientsDiv = document.querySelector('.ingredient__tag')
    const appliancesDiv = document.querySelector('.appliance__tag')
    const ustensilsDiv = document.querySelector('.ustensil__tag')
    const ingredientsSearch = new ingredientsAdvSearch
    const appliancesSearch  = new appliancesAdvSearch
    const ustensilsSearch  = new ustensilsAdvSearch


    function displaySearch (searchsTagTab, searchDiv, options) {
        searchDiv.innerHTML = ""
        searchsTagTab.forEach((search) => {
            let tag = document.createElement("span")
            tag.classList.add("searchTag")
            tag.innerHTML = search
            const newTag = searchDiv.appendChild(tag)
            newTag.addEventListener("click", (e) => {
                addSearchListener(e, options)
                displayAdvencedSearchs(options)
            }  )
        })
    }
    
    function displayIngredientSearchs(options) {
        const ingredientsList = ingredientsSearch.addSearchIngredients(options)
        displaySearch(ingredientsList, ingredientsDiv, options)
    }
    function displayApplianceSearchs(options) {
        const appliancesList = appliancesSearch.addSearchAppliances(options)
        displaySearch(appliancesList, appliancesDiv, options)
    }
    function displayUstensilSearchs(options) {
        const ustensilsList = ustensilsSearch.addSearchUstensils(options)
        displaySearch(ustensilsList, ustensilsDiv, options)
    }
    
    function displayAdvencedSearchs(options) {
        displayIngredientSearchs(options)
        displayApplianceSearchs(options)
        displayUstensilSearchs(options)
    }
    function normalizeString(string) {
        return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '', /^.*abc$/)
    }
    function filterWithInput(options) {
        const text = normalizeString(options.input)
        const regex = new RegExp(text.toLowerCase())
        options.results = new Set(recipes.filter(recipe => 
            (regex.test(normalizeString(recipe.name).toLowerCase())
            ||recipe.ingredients.forEach((item) => regex.test(normalizeString(item.ingredient).toLowerCase()))
            ||regex.test(normalizeString(recipe.description).toLowerCase())) 
        ))
    }

    function filterWithIngredients(data, options) {
        options.ingredientsTagTab.forEach((tag) => {
            const regex = new RegExp(tag.toLowerCase())
            data = Array.from(data).filter((recipe) => {
                return recipe.ingredients.some(({ingredient}) => regex.test(ingredient.toLowerCase()) )
            })
        })
        options.results = new Set(data)
        return new Set(data)
    }
    function filterWithUstensils(data, options) {
        options.ustensilsTagTab.forEach((tag) => {
            const regex = new RegExp(tag.toLowerCase())
            data = Array.from(data).filter((recipe) => {
                const isValid = recipe.ustensils.some((ustensil) => { 
                    return regex.test(ustensil.toLowerCase()) })
                if (isValid) { return true } 
                else { return false }
            })
        })
        options.results = new Set(data)
        return new Set(data)
    }
    function filterWithAppliances(data, options) {
        options.appliancesTagTab.forEach((tag) => {
            const regex = new RegExp(tag.toLowerCase())
            data = Array.from(data).filter((recipe) => {
                if (regex.test(recipe.appliance.toLowerCase())) { return true }
                else { return false }
            })
        })
        options.results = new Set(data)
        return new Set(data)
    }

    function matchesRecipes(options) {
        let data = new Set()
        for(let option in options) {
            switch(option) {
                case 'input' :
                    if (options.input === "") {
                        recipes.map((recipe) => data.add(recipe))
                        Object.values(recipes).map((recipe) => options.results.add(recipe))
                    } else {
                        filterWithInput(options)
                        Array.from(options.results).map((recipe) => data.add(recipe))
                    }
                break
                case 'ingredientsTagTab' :
                    if (options.ingredientsTagTab.size > 0) {
                       data = filterWithIngredients(data, options)
                    }
                break
                case 'ustensilsTagTab' :
                    if (options.ustensilsTagTab.size > 0) {
                        filterWithUstensils(data, options)
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
        results.forEach((recipe) => {
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
            recipe.ingredients.forEach((object) => {
                const inner = stringifyIngredients(object.ingredient, object.quantity, object.unit)
                const containerIngredients = document.createElement('span')
                containerIngredients.classList.add("ingedient__span")
                containerIngredients.innerHTML = inner
                divContainer.appendChild(containerIngredients)
            })
        })
       
    }
    function displaysNoResult() {
        cardContainer.innerHTML = "";
        const message = document.createElement('p');
        message.textContent = "aucun résultat trouvé"
        cardContainer.appendChild(message);
    }
    //------------------------------------------------------------------
    //------------------------------------------------------------------
    //------------------------------------------------------------------

    function addSearchListener(e, options) {
        const object = createNewTag(e,options)
        const tag = object.displayTag(e, options)
        matchesRecipes(options)
        addListenerTag(tag, options)
    }
 
    function addListenerTag(tag, options) {
        tag.addEventListener('click', (e) => removeTag(e, options))
    }

    function removeTag(e, options) {
        const container = document.querySelector('.tag__container')
        let tag
        (e.target.classList[0] === "far" ) ? tag = e.target.parentNode : tag = e.target
        options.results = new Set()
        recipes.map((recipe) => options.results.add(recipe))
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
        matchesRecipes(options)
        displayAdvencedSearchs(options)
    }

    return {
        matchesRecipes, 
        displayRecipes,
        displayAdvencedSearchs,
        displayIngredientSearchs,
        displayApplianceSearchs,
        displayUstensilSearchs, 
        displaysNoResult
    }
}