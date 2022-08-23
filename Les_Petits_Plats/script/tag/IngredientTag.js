import Tag from "./Tag.js";

export default class IngredientTag extends Tag {
    constructor(value, options) {
        super(value,options)
        this.searchTab = "ingredientsTagTab"
        this.searchContainer = document.querySelector(".ingredient__tag")
    }
    displayTag(e, options){
        console.log(e, options)
        const value = e.target.textContent
        options.ingredientsTagTab.add(value)
        const tag = this.createTag(value, options)
        tag.classList.add('tag--ingredient')
        let search = e.target
        this.searchContainer.removeChild(search)
        options = this.matchsRecipes(options, "ingredient", value)
        return options
    }

}