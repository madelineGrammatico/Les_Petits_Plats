import Tag from "./Tag.js";

export default class IngredientTag extends Tag {
    constructor(recipes) {
        super(recipes)
        this.searchTab = "ingredientsTagTab"
        this.searchContainer = document.querySelector(".ingredient__tag")
    }
    displayTag(e, options){
        const value = e.target.textContent
        options.ingredientsTagTab.add(value)
        const tag = this.createTag(value, options)
        tag.classList.add('tag--ingredient')
        let search = e.target
        this.searchContainer.removeChild(search)
        options.results = this.ultimateMatchesRecipes(options)
        return options
    }

}