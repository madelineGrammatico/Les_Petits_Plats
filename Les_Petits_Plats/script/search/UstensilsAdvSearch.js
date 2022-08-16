import AvencedSearch from "./AvencedSeach.js";
import tagFactory from "../factory/tagFactory.js";

export default class UstensilsAdvSearch extends AvencedSearch{
    constructor (result) {
        super(result)
    }
    displaySearchUstensils(options) {
        const searchDiv = document.querySelector('.ustensil__tag')
        searchDiv.innerHTML = ""
        this.result.forEach((recipe) => {
            recipe.ustensils.forEach((ustensil) => {
                this.searchsTagTab.add(ustensil.toLowerCase())
            })
        })
        this.searchsTagTab.forEach((ustensil)=> {
            let tag = document.createElement("span")
            tag.classList.add("searchTag")
            tag.innerHTML = ustensil
            const newTag = searchDiv.appendChild(tag)
            newTag.addEventListener("click", (e) => tagFactory(e, options))
        })
        return this.searchsTagTab

    }
    
}