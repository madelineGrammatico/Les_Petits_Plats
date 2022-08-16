import AvencedSearch from "./AvencedSeach.js";
import tagFactory from "../factory/tagFactory.js";

export default class AppliancesAdvSearch extends AvencedSearch{
    constructor (result) {
        super(result)
    }
    displaySearchAppliances(options) {
        const searchDiv = document.querySelector('.appliance__tag')
        searchDiv.innerHTML = ""
        this.result.forEach((recipe) => {
            this.searchsTagTab.add(recipe.appliance.toLowerCase())
        })
        this.searchsTagTab.forEach((appliance)=> {
            let tag = document.createElement("span")
            tag.classList.add("searchTag")
            tag.innerHTML = appliance
            const newTag = searchDiv.appendChild(tag)
            newTag.addEventListener("click", (e) => tagFactory(e, options))
        })
        return this.searchsTagTab
    }
    
}