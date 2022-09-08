import recipes from "../../recipes.js";
import GlobalSearch from "../globalSearch/GlobalSearch.js";


let input = ""
const results = new Set()
const ingredientsTagTab = new Set()
const appliancesTagTab = new Set()
const ustensilsTagTab = new Set()
const options = { results, input, ingredientsTagTab, appliancesTagTab, ustensilsTagTab }
const globalSearch = new GlobalSearch(recipes)

globalSearch.ultimateMatchesRecipes(options)
globalSearch.displayAdvencedSearchs(options)

const searchRecipe = document.querySelector('.search__recipe');
searchRecipe.addEventListener('input', (e) => {
    if (e.currentTarget.value.length >= 3) { 
        options.input = e.currentTarget.value
        globalSearch.ultimateMatchesRecipes(options)
        if (options.results.size !== 0) {
            globalSearch.displayAdvencedSearchs(options)
        } else {
            console.log('no results')
            globalSearch.displaysNoResult();
        }
    } else {
        options.input = ""
        globalSearch.ultimateMatchesRecipes(options)
        globalSearch.displayAdvencedSearchs(options)
    }
})

const advencedSearchInput = document.querySelectorAll('.search__input')
for (let searchInput of advencedSearchInput) {
    searchInput.addEventListener('input', (e) => {
        switch(e.target.classList[1]) {
            case 'input__ingredient':
                globalSearch.displayIngredientSearchs(options)
            break
            case 'input__appliance':
                globalSearch.displayApplianceSearchs(options)
            break
            case 'input__ustensil' :
                globalSearch.displayUstensilSearchs(options)
            break
        }
        const containerSearchs = e.target.parentNode.querySelector('.search__tag')
        const searchsTab = e.target.parentNode.querySelectorAll('.searchTag')
        const inputRegex = new RegExp(e.target.value.toLowerCase())
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
