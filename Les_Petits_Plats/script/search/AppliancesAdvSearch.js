import AvencedSearch from "./AvencedSeach.js";
import tagFactory from "../factory/tagFactory.js";

export default class AppliancesAdvSearch extends AvencedSearch{
    constructor (results) {
        super(results)
        this.searchDiv = document.querySelector('.appliance__tag')
    }
    addSearchAppliances() {
        this.results.forEach((recipe) => {
            this.searchsTagTab.add(recipe.appliance.toLowerCase())
        })
        return this
    }

  

    displaySearch(options, recipes) {
        this.searchDiv.innerHTML = ""
        this.searchsTagTab.forEach((appliance)=> {
            let tag = document.createElement("span")
            tag.classList.add("searchTag")
            tag.innerHTML = appliance
            const newTag = this.searchDiv.appendChild(tag)
            
            newTag.addEventListener("click", (e) => { 
                tagFactory(e, options, recipes)
            })
        })
    }
}