import recipes from "../../recipes.js";
import MainSearch from "../search/MainSearch.js";

import IngredientsAdvSearch from "../search/IngredientsAdvSearch.js";
import AppliancesAdvSearch from "../search/AppliancesAdvSearch.js";
import UstensilsAdvSearch from "../search/UstensilsAdvSearch.js";

let input = ""
let results = new Set()
let ingredientsTagTab = new Set()
let appliancesTagTab = new Set()
let ustensilsTagTab = new Set()

const allIngredients = new Set()
recipes.forEach((recipe)=> {
    recipe.ingredients.forEach((ingredient) => {
        allIngredients.add(ingredient.ingredient.toLowerCase())
    })
})

const allAppliances = new Set()
recipes.forEach((recipe)=> {
        allAppliances.add(recipe.appliance.toLowerCase())
})

const allUstensils = new Set()
recipes.forEach((recipes)=> {
    recipes.ustensils.forEach((ustensil) => {
        allUstensils.add(ustensil.toLowerCase())
    })
})

const options = { results, input, ingredientsTagTab, appliancesTagTab, ustensilsTagTab }

const setAvencedSearch = (data = recipes) => {
    ingredientSearch = new IngredientsAdvSearch(data)
    applianceSearch = new AppliancesAdvSearch(data)
    ustensilSearch = new UstensilsAdvSearch(data)

}
const displayAdvencedSearchs = () => {
    ingredientsTagTab = ingredientSearch.addSearchIngredients()
    appliancesTagTab = applianceSearch.addSearchAppliances()
    ustensilsTagTab = ustensilSearch.addSearchUstensils()

    ingredientSearch.displaySearch(options)
    applianceSearch.displaySearch(options)
    ustensilSearch.displaySearch(options)
}

const searchRecipe = document.querySelector('.search__recipe');
const searchAdvenceContainer = document.querySelectorAll(".advencedSearch__container");

const mainSearch = new MainSearch(recipes)
let ingredientSearch = new IngredientsAdvSearch(recipes)
let applianceSearch = new AppliancesAdvSearch(recipes)
let ustensilSearch = new UstensilsAdvSearch(recipes)
setAvencedSearch()

mainSearch.displayRecipes()
displayAdvencedSearchs()

searchRecipe.addEventListener('input', (e) => {
    if (e.currentTarget.value.length >= 3) { 
        options.input = e.currentTarget.value
        // options.results = mainSearch.matchsRecipes(options.input)
        options.results = mainSearch.ultimateMatchesRecipes(options)
        console.log(options.results.length !== 0)
        if (options.results.length !== 0) {
            mainSearch.displayRecipes(options.results)
            setAvencedSearch(options.results)
            displayAdvencedSearchs()
        } else {
            mainSearch.displaysNoResult();
        }
    }
    else { 
        options.results = []
        options.input = ""
        mainSearch.ultimateMatchesRecipes(options)
        setAvencedSearch(options.results)
        displayAdvencedSearchs()
    }
});

// console.log(result)

// displayCard(recipes);
// searchRecipe.addEventListener('input', findMatches);


searchAdvenceContainer.forEach((div)=> {
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

// function stringifyIngredients(ingredient, quantity = "", unit="") {
//     return `${ingredient} : ${quantity} ${unit}`
// }

// function displayCard(data) {
//     const cardContainer = document.querySelector("main");
//     cardContainer.innerHTML = "";
//     data.forEach((recipe) => {
//         const card = document.createElement('article');
//         card.classList.add('card__Recipes');
//         card.innerHTML = `<a href="">
//                             <img src="" alt=""></img>
//                             <div class="card__data">
//                                 <span class="card__title">${recipe.name}</span>
//                                 <span class="card__duration"><i class="far fa-clock"></i> ${recipe.time} min</span>
//                                 <div class="card__ingredients"></div>
//                                 <span class="card__recipe">${recipe.description}</span>
//                             </div>
//                         </a>`;
//         cardContainer.appendChild(card);
//         const divContainer = card.querySelector(".card__ingredients")
        
//         recipe.ingredients.forEach((object) => {
//             const inner =  stringifyIngredients(object.ingredient, object.quantity, object.unit)
//             const containerIngredients = document.createElement('span')
//             containerIngredients.classList.add("ingedient__span")
//             containerIngredients.innerHTML = inner
//             divContainer.appendChild(containerIngredients)
//         })
//     })
// }
// function findMatchesTag(recipes, tagContent) {
//     const array = []
//     recipes.forEach((recipe) => {
//         if (recipe.name.toLowerCase().indexOf(tagContent.toLowerCase()) !== -1 
//             || recipe.ingredients.forEach((item) => {item.ingredient.toLowerCase().indexOf(tagContent.toLowerCase()) !== -1})
//             || recipe.description.toLowerCase().indexOf(tagContent.toLowerCase()) !== -1
//             ) {array.push(recipe)} 
//     })
//     result = array
//     displayCard(result)
// }
// function removeTag(e){

//     const tagContainer = document.querySelector(".tag__container")
//     tagContainer.removeChild(e.currentTarget)
// }

// function activeTag(e) {
//     const tagContainer = document.querySelector(".tag__container")
//     const tag = document.createElement("span")
//     tag.classList.add("activeTag")
//     const tagContent = e.target.textContent
//     console.log(e.target)
//     tag.innerHTML = tagContent + "<i class='far fa-times-circle'></i>"
//     if (e.target.parentElement.classList[0].indexOf("ingredient") !== -1) {tag.classList.add("tag--ingredient")}
//     else if (e.target.parentElement.classList[0].indexOf("appliance") !== -1) {tag.classList.add("tag--appliance")}
//     else if (e.target.parentElement.classList[0].indexOf("ustensil") !== -1) {tag.classList.add("tag--ustensil")}
//     tagContainer.appendChild(tag)
//     findMatchesTag(result, tagContent)
//     tag.addEventListener('click', removeTag)
// }

// function displayTagInSearch(tab, searchClass){
//     const searchDiv = document.querySelector(searchClass)
//     searchDiv.inner = ""
//     tab.forEach((item) => {
//         let tag = document.createElement("span")
//         tag.classList.add("searchTag")
//         tag.innerHTML = item
//         searchDiv.appendChild(tag)
//         tag = addEventListener("click", activeTag)
//     })
// }

// function findMatches(e) {
//     result = []
//     ingredientsTagTab = []
//     appliancesTagTab = []
//     ustensilsTagTab = []
//     if (e.currentTarget.classList[0] === "search__recipe" && e.currentTarget.value.length < 3) {
//         displayCard(recipes);
//     } else if (e.currentTarget.classList[0] === "search__recipe" && e.currentTarget.value.length >= 3) {
    
//         findMatchesTag(recipes, e.currentTarget.value)

//         result.forEach((card) => {
//             card.ingredients.forEach((ingredient) => {
//                 ingredientsTagTab.push(ingredient.ingredient.toLowerCase())
//             })
//         }) 
//         ingredientsTagTab = Array.from( new Set(ingredientsTagTab))
//         // console.log(ingredientsTagTab)
//         displayTagInSearch(ingredientsTagTab, ".ingredient__tag")

//         result.forEach((card) => {
//             card.ustensils.forEach((ustensils) => {
//                 ustensilsTagTab.push(ustensils.toLowerCase())
//             })
//         }) 
//         ustensilsTagTab = Array.from( new Set(ustensilsTagTab))
//         // console.log(ustensilsTagTab)
//         displayTagInSearch(ustensilsTagTab, ".ustensil__tag")

//         result.forEach((card) => {
//                 appliancesTagTab.push(card.appliance.toLowerCase())
//         }) 
//         appliancesTagTab = Array.from( new Set(appliancesTagTab))
//         // console.log(appliancesTagTab)
//         displayTagInSearch(appliancesTagTab, ".appliance__tag")
//     }
// }
