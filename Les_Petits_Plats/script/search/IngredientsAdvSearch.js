export default class IngredientsAdvSearch {
    addSearchIngredients(options) { 
        const searchsTagTab = new Set()
        options.results.forEach((recipes) => {
            recipes.ingredients.forEach((ingredient) => {
                searchsTagTab.add(ingredient.ingredient.toLowerCase())
            })
        })

        return searchsTagTab
    }
}
