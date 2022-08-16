import Tag from "./Tag.js";

export default class IngredientTag extends Tag {
    constructor(value, options) {
        super(value,options)
        this.searchContainer = document.querySelector(".ingredient__tag")
    }
    displayTag(e, options){
        const value = e.target.textContent
        console.log(value)
        options.ingredientsTagTab.add(value)
        const tag = this.createTag(value, options)
        tag.classList.add('tag--ingredient')
        let search = e.target
        this.searchContainer.removeChild(search)
        
        

        console.log(options)
    }

}