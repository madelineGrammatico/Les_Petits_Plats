import AvencedSearch from "./AvencedSeach.js";
import tagFactory from "../factory/tagFactory.js";

export default class UstensilsAdvSearch extends AvencedSearch{
    constructor (results) {
        super(results)
        this.searchDiv = document.querySelector('.ustensil__tag')
    }
    addSearchUstensils() {
        this.results.forEach((recipe) => {
            recipe.ustensils.forEach((ustensil) => {
                this.searchsTagTab.add(ustensil.toLowerCase())
            })
        })
        return this
    }
  
    displaySearch(options) {
        this.searchDiv.innerHTML = ""
        this.searchsTagTab.forEach((ustensil)=> {
            let tag = document.createElement("span")
            tag.classList.add("searchTag")
            tag.innerHTML = ustensil
            const newTag = this.searchDiv.appendChild(tag)

            newTag.addEventListener("click", (e) => { 
                tagFactory(e, options, this.recipes)
            })
        })

    }
    
}