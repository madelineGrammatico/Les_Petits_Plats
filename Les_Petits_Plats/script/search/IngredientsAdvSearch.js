import AvencedSearch from "./AvencedSeach.js";
import tagFactory from "../factory/tagFactory.js";

export default class IngredientsAdvSearch extends AvencedSearch{
    constructor (result) {
        super(result)
    }
    displaySearchIngredients(options) {
        const searchDiv = document.querySelector('.ingredient__tag')
        searchDiv.innerHTML = ""
        this.result.forEach((recipes) => {
            recipes.ingredients.forEach((ingredient) => {
                this.searchsTagTab.add(ingredient.ingredient.toLowerCase())
            })
        })
        this.searchsTagTab.forEach((ingredient)=> {
            let tag = document.createElement("span")
            tag.classList.add("searchTag")
            tag.innerHTML = ingredient
            const newTag = searchDiv.appendChild(tag)
            newTag.addEventListener("click", (e) => { 
                tagFactory(e, options)
                
             })
            
    
        })
        return this.searchsTagTab

    }
    
}