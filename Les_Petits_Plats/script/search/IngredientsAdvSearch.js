// import AvencedSearch from "./AvencedSeach.js";
// import tagFactory from "../factory/tagFactory.js";

export default class IngredientsAdvSearch {
    constructor () {
        
    }

    addSearchIngredients(options) { 
        const searchsTagTab = new Set()
        options.results.forEach((recipes) => {
            recipes.ingredients.forEach((ingredient) => {
                searchsTagTab.add(ingredient.ingredient.toLowerCase())
            })
        })
        return searchsTagTab
        
    }

   

    // displaySearch(options, recipes) {
       
    //     this.searchDiv.innerHTML = ""
    //     this.searchsTagTab.forEach((ingredient)=> {
    //         let tag = document.createElement("span")
    //         tag.classList.add("searchTag")
    //         tag.innerHTML = ingredient
    //         const newTag = this.searchDiv.appendChild(tag)
           
    //         newTag.addEventListener("click", (e) => { 
    //             tagFactory(e, options, recipes)
    //         })
            
           
    //     })
      
    // }
    
}