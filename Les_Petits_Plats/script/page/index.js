import recipes from "../../recipes.js";
import globalSearch from "../globalSearch/globalSearch.js";

let input = ""
const results = new Set()
const ingredientsTagTab = new Set()
const appliancesTagTab = new Set()
const ustensilsTagTab = new Set()
const options = { results, input, ingredientsTagTab, appliancesTagTab, ustensilsTagTab}
const globalSearchObject = globalSearch(recipes)

globalSearchObject.matchesRecipes(options)
globalSearchObject.displayAdvencedSearchs(options)

const searchRecipe = document.querySelector('.search__recipe')
searchRecipe.addEventListener('input', (e) => {
    if (e.currentTarget.value.length >= 3) {
        options.input = e.currentTarget.value
        globalSearchObject.matchesRecipes(options)
        if (options.results.length !== 0) {
            globalSearchObject.displayAdvencedSearchs(options)
        } else {
            globalSearchObject.displaysNoResult();
        }
    } else {
        options.input = ""
        globalSearchObject.matchesRecipes(options)
        globalSearchObject.displayAdvencedSearchs(options)
    }
})

const advencedSearchInput = document.querySelectorAll('.search__input')
advencedSearchInput.forEach((searchInput) => {
    searchInput.addEventListener('input', (e) => {
        switch(e.target.classList[1]) {
            case 'input__ingredient':
                globalSearchObject.displayIngredientSearchs(options)
            break
            case 'input__appliance':
                globalSearchObject.displayApplianceSearchs(options)
            break
            case 'input__ustensil':
                globalSearchObject.displayUstensilSearchs(options)
            break
        }
        const containerSearchs = e.target.parentNode.querySelector('.search__tag')
        const tab = e.target.parentNode.querySelectorAll('.searchTag')
        const inputRegex = new RegExp(e.target.value.toLowerCase())
        Array.from(tab).filter((search) => {
            if(inputRegex.test(search.textContent.toLowerCase())) {
                return true
            } else {
                containerSearchs.removeChild(search)
                return false
            }
        })
    })
})
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
    const div = e.currentTarget.querySelector(".search__tag__container")
    btn.style.display = "none"
    btn.nextElementSibling.style.display = "grid"
    div.innerHTML != "" ? div.style.display = "grid" : div.style.display = "none"
}

function displayBtnSearchAdvenced(e) {
    e.preventDefault()
    e.stopPropagation()
    const btn = e.target.querySelector("button")
    btn.style.display = "block"
    btn.nextElementSibling.style.display = "none"
}
