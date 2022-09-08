import recipes from "../../recipes.js";
import IngredientsAdvSearch from "../search/IngredientsAdvSearch.js";
import AppliancesAdvSearch from "../search/AppliancesAdvSearch.js";
import UstensilsAdvSearch from "../search/UstensilsAdvSearch.js";
import GlobalSearch from "../globalSearch/GlobalSearch.js";

const results = new Set()
let input = ""
const ingredientsTagTab = new Set()
const appliancesTagTab = new Set()
const ustensilsTagTab = new Set()
const options = { results, input, ingredientsTagTab, appliancesTagTab, ustensilsTagTab }

const globalSearch = new GlobalSearch(recipes)
globalSearch.ultimateMatchesRecipes(options)

const ingredientsDiv = document.querySelector('.ingredient__tag')
const appliancesDiv = document.querySelector('.appliance__tag')
const ustensilsDiv = document.querySelector('.ustensil__tag')

let ingredientSearch = new IngredientsAdvSearch(recipes)
let applianceSearch = new AppliancesAdvSearch(recipes)
let ustensilSearch = new UstensilsAdvSearch(recipes)

const displaySearch = (searchsTagTab, searchDiv) => {
    searchDiv.innerHTML = ""
    searchsTagTab.forEach((ingredient)=> {
        let tag = document.createElement("span")
        tag.classList.add("searchTag")
        tag.innerHTML = ingredient
        const newTag = searchDiv.appendChild(tag)
       
        newTag.addEventListener("click", (e) => {
            globalSearch.addSearchListener(e, options)
            displayAdvencedSearchs()
        }  )
    })
}

const displayIngredientSearchs = () => {
    const ingredientsList = ingredientSearch.addSearchIngredients(options)
    displaySearch(ingredientsList, ingredientsDiv)
}
const displayApplianceSearchs =() => {
    const appliancesList = applianceSearch.addSearchAppliances(options)
    displaySearch(appliancesList, appliancesDiv)
}
const displayUstensilSearchs = () => {
    const ustensilsList = ustensilSearch.addSearchUstensils(options)
    displaySearch(ustensilsList, ustensilsDiv)
}

const displayAdvencedSearchs = () => {
    displayIngredientSearchs()
    displayApplianceSearchs()
    displayUstensilSearchs()
}

displayAdvencedSearchs()

const searchRecipe = document.querySelector('.search__recipe');
searchRecipe.addEventListener('input', (e) => {
    if (e.currentTarget.value.length >= 3) { 
        options.input = e.currentTarget.value
        globalSearch.ultimateMatchesRecipes(options)
        if (options.results.size !== 0) {
            displayAdvencedSearchs()
        } else {
            console.log('no results')
            globalSearch.displaysNoResult();
        }
    } else {
        options.input = ""
        globalSearch.ultimateMatchesRecipes(options)
        displayAdvencedSearchs()
    }
})

const advencedSearchInput = document.querySelectorAll('.search__input')
for (let searchInput of advencedSearchInput) {
    searchInput.addEventListener('input', (e) => {
        switch(e.target.classList[1]) {
            case 'input__ingredient':
                displayIngredientSearchs()
            break
            case 'input__appliance':
                displayApplianceSearchs()
            break
            case 'input__ustensil' :
                displayUstensilSearchs()
            break
        }
        const targetParent = e.target.parentNode
        const containerSearchs = targetParent.querySelector('.search__tag')
        const searchsTab = e.target.parentNode.querySelectorAll('.searchTag')
        input = e.target.value.toLowerCase()
        const inputRegex = new RegExp(input)
        for (let search of searchsTab) {
            if (!inputRegex.test(search.textContent.toLowerCase())) {
                containerSearchs.removeChild(search)
            }
        }
    })
}

//===================================================================================
//===================================================================================
//===================================================================================

const searchAdvencedContainer = document.querySelectorAll(".advencedSearch__container");
searchAdvencedContainer.forEach((div)=> {
    div.addEventListener('mouseenter', displaySearchAdvenced)
    div.addEventListener('mouseleave', displayBtnSearchAdvenced)
    
})

function displaySearchAdvenced(e) {
    e.preventDefault()
    e.stopPropagation()
    const btn = e.currentTarget.querySelector("button")
    const div = e.currentTarget.querySelector(".search__tag")
    btn.style.display = "none"
    btn.nextElementSibling.style.display = "grid"
    div.innerHTML != "" ? div.style.display = "flex" : div.style.display = "none"
}

function displayBtnSearchAdvenced(e) {
    e.preventDefault()
    e.stopPropagation()
    const btn = e.target.querySelector("button")
    btn.style.display = "block"
    btn.nextElementSibling.style.display = "none"
}
