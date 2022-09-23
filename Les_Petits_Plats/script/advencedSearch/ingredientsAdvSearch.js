export default function ingredientsAdvSearch() {
    function addSearchIngredients(options) { 
        const searchsTagTab = new Set()
        options.results.forEach((recipe) => {
           recipe.ingredients.forEach((item) => {
                searchsTagTab.add(item.ingredient.toLowerCase())
            })
        })
        return Array.from(searchsTagTab).sort()
    }
    return {addSearchIngredients}
}