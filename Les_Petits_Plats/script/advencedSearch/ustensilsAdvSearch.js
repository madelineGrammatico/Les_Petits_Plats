export default function ustensilsAdvSearch() {
    function addSearchUstensils(options) {
        const searchsTagTab = new Set()
        options.results.forEach((recipe) => {
            recipe.ustensils.forEach((ustensil) => {
                searchsTagTab.add(ustensil.toLowerCase())
            })
        })
        return Array.from(searchsTagTab).sort()
    }
    return {addSearchUstensils}
}