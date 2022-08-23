import AvencedSearch from "./AvencedSeach.js";
import tagFactory from "../factory/tagFactory.js";

export default class IngredientsAdvSearch extends AvencedSearch{
    constructor (results) {
        super(results)
        this.searchDiv = document.querySelector('.ingredient__tag')
        
    }
    displaySearchIngredients() {
        
        this.results.forEach((recipes) => {
            recipes.ingredients.forEach((ingredient) => {
                this.searchsTagTab.add(ingredient.ingredient.toLowerCase())
            })
        })
        
        return this

    }
    addTagEvent(newTag, options) {
        newTag.addEventListener("click", (e) => { 
            tagFactory(e, options)
        })
    }
    addTag(options) {
        this.searchDiv.innerHTML = ""
        this.searchsTagTab.forEach((ingredient)=> {
            let tag = document.createElement("span")
            tag.classList.add("searchTag")
            tag.innerHTML = ingredient
            const newTag = this.searchDiv.appendChild(tag)
            this.addTagEvent(newTag, options)

        })
        
    }
    
}