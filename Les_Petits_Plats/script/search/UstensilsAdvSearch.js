export default class UstensilsAdvSearch {
    addSearchUstensils(options) {
        const searchsTagTab = new Set()
        for(let recipe of options.results) {
            for(let ustensil of recipe.ustensils) {
                searchsTagTab.add(ustensil.toLowerCase())
            }
        }

        return searchsTagTab
    }
}