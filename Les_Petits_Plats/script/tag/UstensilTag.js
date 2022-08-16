import Tag from "./Tag.js";

export default class UstensilTag extends Tag {
    constructor(value, options) {
        super(value, options)
    }
    displayTag(e, options){
        options.ustensilsTagTab.add(e.target.value)
        const tag = this.createTag(e.target.value, options)
        tag.classList.add('tag--ustensil')
    }

}