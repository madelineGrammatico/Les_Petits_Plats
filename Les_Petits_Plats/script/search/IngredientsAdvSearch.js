export default class IngredientsAdvSearch {
    addSearchIngredients(options) { 
        const searchsTagTab = new Set()
        for(let recipes of options.results) {
            recipes.ingredients.forEach((ingredient) => {
                searchsTagTab.add(ingredient.ingredient.toLowerCase())
            })
        }

        return searchsTagTab
    }
}
