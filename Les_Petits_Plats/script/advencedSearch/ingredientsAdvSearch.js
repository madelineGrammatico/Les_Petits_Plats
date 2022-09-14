export default function ingredientsAdvSearch() {
    function addSearchIngredients(options) { 
        console.log(options)
        const searchsTagTab = new Set()
        options.results.forEach((recipe) => {
           recipe.ingredients.forEach((item) => {
                console.log(item.ingredient)
                searchsTagTab.add(item.ingredient.toLowerCase())
            })
        })
        // console.log(searchsTagTab)
        
        // const searchsTagTab = options.results.map((objet) => {
        //     return objet.ingredients
        // }).map((ingredient) => {
        //     console.log(ingredient)
        //      return ingredient.ingredient.loLowerCase()
        // })
        // const searchsTagTab = options.results.map((objet) => {
        //     return objet.ingredients.map((ingredient) => {
        //         console.log(ingredient.ingredient)
        //          return ingredient.ingredient
        //     })
        // })

        return searchsTagTab
    }
    return {addSearchIngredients}
}