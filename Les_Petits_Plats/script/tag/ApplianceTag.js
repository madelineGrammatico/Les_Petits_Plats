import Tag from "./Tag.js";

export default class ApplianceTag extends Tag {
    constructor() {
        super()
        this.searchTab = "appliancesTagTab"
        this.searchContainer = document.querySelector(".appliance__tag")
    }
    displayTag(e, options){
        const value = e.target.textContent
        options.appliancesTagTab.add(value)
        const tag = this.createTag(value)
        tag.classList.add('tag--appliance')
        let search = e.target
        this.searchContainer.removeChild(search)
        return tag
    }

}