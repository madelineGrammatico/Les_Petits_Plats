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
    }
})
console.log(recipes)

// let result = [];
// const searchRecipe = document.querySelector('.search__recipe');

// displayCard(recipes);
// searchRecipe.addEventListener('input', findMatches);

// function stringifyIngredients(ingredient, quantity = "", unit = "") {
//     return`${ingredient} : ${quantity} ${unit}`
            
// }

// function displayCard(data) {
//     const cardContainer = document.querySelector("main");
//     cardContainer.innerHTML = "";
//     data.forEach((recipe) => {
//         const card = document.createElement('article');
//         card.classList.add('card__Recipes');
//         card.innerHTML = `<a href="">
//                             <img src="" alt=""></img>
//                             <span class="card__title">${recipe.name}</span>
//                             <span class="card__duration">${recipe.time} min</span>
//                             <div class="card__ingredients"></div>
//                             <span class="card__recipe">${recipe.description}</span>
//                         </a>`;
//         cardContainer.appendChild(card);
//         const dataCardContainer = card.querySelector(".card__ingredients")
        
//         recipe.ingredients.map((object) => {
//             const inner =  stringifyIngredients(object.ingredient, object.quantity, object.unit)
//             const divIngredients = document.createElement('span')
//             divIngredients.classList.add("ingedient__span")
//             divIngredients.innerHTML = inner
//             dataCardContainer.appendChild(divIngredients)
//         })

//     })
// }

// function findMatches(e) {
//     if (e.currentTarget.classList[0] === "search__recipe" && e.currentTarget.value.length < 3) {
//         displayCard(recipes);
//     } else if (e.currentTarget.classList[0] === "search__recipe" && e.currentTarget.value.length >= 3) {
//         result = recipes.filter(recipe => 
//             recipe.name.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) !== -1
//             || recipe.ingredients.map((item) => {return item.ingredient}).join(" ").toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) !== -1
//             || recipe.description.toLowerCase().indexOf(e.currentTarget.value.toLowerCase())!== -1
//         )
//         displayCard(result)       
//     }
// }
