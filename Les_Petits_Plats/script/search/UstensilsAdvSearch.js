export default class UstensilsAdvSearch {
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