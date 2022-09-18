export default function ingredientsAdvSearch() {
    function addSearchIngredients(options) { 
        const searchsTagTab = new Set()
        Array.from(options.results).map((recipe) => {
           recipe.ingredients.forEach((item) => {
                searchsTagTab.add(item.ingredient.toLowerCase())
            })
        })
        return searchsTagTab
    }
    return {addSearchIngredients}
}