let result = [];
let ingredientsTagTab = []
let appliancesTagTab = []
let ustensilsTagTab = []
const searchRecipe = document.querySelector('.search__recipe');
const searchAdvenceContainer = document.querySelectorAll(".advencedSearch__container");

displayCard(recipes);
searchRecipe.addEventListener('input', findMatches);

searchAdvenceContainer.forEach((div)=> {
    div.addEventListener('mouseenter', displaySearchAdvenced)
    div.addEventListener('mouseleave', displayBtnSearchAdvenced)
    
})

function displaySearchAdvenced(e) {
    e.stopPropagation()
    const btn = e.currentTarget.querySelector("button")
    const div = e.currentTarget.querySelector(".search__tag")
    btn.style.display = "none"
    btn.nextElementSibling.style.display = "block"
    console.log(div)
    div.innerHTML != "" ? div.style.display = "flex" : div.style.display = "none"
    

}
function displayBtnSearchAdvenced(e) {
    e.stopPropagation()
    const btn = e.target.querySelector("button")
    btn.style.display = "block"
    btn.nextElementSibling.style.display = "none"

}

function stringifyIngredients(ingredient, quantity = "", unit="") {
    return `${ingredient} : ${quantity} ${unit}`
}

function displayCard(data) {
    const cardContainer = document.querySelector("main");
    cardContainer.innerHTML = "";
    data.forEach((recipe) => {
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
        cardContainer.appendChild(card);
        const divContainer = card.querySelector(".card__ingredients")
        
        recipe.ingredients.forEach((object) => {
            const inner =  stringifyIngredients(object.ingredient, object.quantity, object.unit)
            const containerIngredients = document.createElement('span')
            containerIngredients.classList.add("ingedient__span")
            containerIngredients.innerHTML = inner
            divContainer.appendChild(containerIngredients)
        })
    })
}

function displayTagInSearch(tab, searchClass){
    const searchDiv = document.querySelector(searchClass)
    searchDiv.inner = ""
    tab.forEach((item) => {
        const tag = document.createElement("span")
        tag.classList.add("searchTag")
        tag.innerHTML = item
        searchDiv.appendChild(tag)

    })

}


function findMatches(e) {
    result = []
    ingredientsTagTab = []
    appliancesTagTab = []
    ustensilsTagTab = []
    if (e.currentTarget.classList[0] === "search__recipe" && e.currentTarget.value.length < 3) {
        displayCard(recipes);
    } else if (e.currentTarget.classList[0] === "search__recipe" && e.currentTarget.value.length >= 3) {
       
        recipes.forEach(recipe => 
            { if (recipe.name.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) !== -1 
                || recipe.ingredients.forEach((item) => {item.ingredient.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) !== -1})
                || recipe.description.toLowerCase().indexOf(e.currentTarget.value.toLowerCase())!== -1)
            result.push(recipe)
            })
        displayCard(result)
        
            // findMatchesAdvSearch("ingredients", ingredientsTagTab)
            // findMatchesAdvSearch("aplliances", appliancesTagTab)
            // findMatchesAdvSearch("utensils", utensilsTagTab)
        result.forEach((card) => {
            card.ingredients.forEach((ingredient) => {
                ingredientsTagTab.push(ingredient.ingredient.toLowerCase())
            })
        }) 
        ingredientsTagTab = Array.from( new Set(ingredientsTagTab))
        console.log(ingredientsTagTab)
        displayTagInSearch(ingredientsTagTab, ".ingredient__tag")

        result.forEach((card) => {
            card.ustensils.forEach((ustensils) => {
                ustensilsTagTab.push(ustensils.toLowerCase())
            })
        }) 
        ustensilsTagTab = Array.from( new Set(ustensilsTagTab))
        console.log(ustensilsTagTab)
        displayTagInSearch(ustensilsTagTab, ".ustensil__tag")

        result.forEach((card) => {
                appliancesTagTab.push(card.appliance.toLowerCase())
        }) 
        appliancesTagTab = Array.from( new Set(appliancesTagTab))
        console.log(appliancesTagTab)
        displayTagInSearch(appliancesTagTab, ".appliance__tag")
    }
    // function findMatchesAdvSearch(search, tab){
    //     result.forEach((card) => {
    //         card.search.forEach((tag) => {
    //             (search === "ingredients") ? ingredientsTagTab.push(tag.ingredient.toLowerCase()) : ingredientsTagTab.push(tag.toLowerCase())
    //         })
    //     }) 
    //     tab = Array.from( new Set(tab))
    //     console.log(tab)
    // }
}
