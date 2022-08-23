import Tag from "./Tag.js";

export default class ApplianceTag extends Tag {
    constructor(value, options) {
        super(value, options)
        this.searchContainer = document.querySelector(".appliance__tag")
    }
    displayTag(e, options){
        const value = e.target.textContent
        console.log(value)
        options.ingredientsTagTab.add(value)
        const tag = this.createTag(value, options)
        tag.classList.add('tag--appliance')
        let search = e.target
        this.searchContainer.removeChild(search)
        
    }

}