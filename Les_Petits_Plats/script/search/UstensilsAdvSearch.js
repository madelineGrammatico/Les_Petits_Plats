// import AvencedSearch from "./AvencedSeach.js";
// import tagFactory from "../factory/tagFactory.js";

export default class UstensilsAdvSearch {
    constructor () {
      
    }
    addSearchUstensils(options) {
        const searchsTagTab = new Set()
        options.results.forEach((recipe) => {
            recipe.ustensils.forEach((ustensil) => {
                searchsTagTab.add(ustensil.toLowerCase())
            })
        })
        return searchsTagTab
    }
  
    
}