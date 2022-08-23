import Tag from "./Tag.js";

export default class UstensilTag extends Tag {
    constructor(value, options) {
        super(value, options)
        this.searchContainer = document.querySelector(".ustensil__tag")
    }
    displayTag(e, options){
        const value = e.target.textContent
        options.ustensilsTagTab.add(value)
        const tag = this.createTag(value, options)
        tag.classList.add('tag--ustensil')
        const search = e.target
        this.searchContainer.removeChild(search)
    }

}