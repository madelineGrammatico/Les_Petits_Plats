export default function ustensilsAdvSearch() {
    function addSearchUstensils(options) {
        const searchsTagTab = new Set()
        Array.from(options.results).map((recipe) => {
            recipe.ustensils.forEach((ustensil) => {
                searchsTagTab.add(ustensil.toLowerCase())
            })
        })
        return searchsTagTab
    }
    return {addSearchUstensils}
}