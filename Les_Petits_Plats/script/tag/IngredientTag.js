import Tag from "./Tag.js";

export default class IngredientTag extends Tag {
    constructor() {
        super()
        this.searchTab = "ingredientsTagTab"
        this.searchContainer = document.querySelector(".ingredient__tag")
    }
    displayTag(e, options) {
        const value = e.target.textContent
        options.ingredientsTagTab.add(value)
        const tag = this.createTag(value)
        tag.classList.add('tag--ingredient')
        let search = e.target
        this.searchContainer.removeChild(search)
        return tag
    }

}