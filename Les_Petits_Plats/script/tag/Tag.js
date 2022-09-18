

export default class Tag {
    constructor() {
        this.container = document.querySelector('.tag__container')
        this.cardContainer = document.querySelector("main");
        this.searchTab = ""
    }
   
    createTag(value) {
        const tag = document.createElement("span")
        tag.classList.add("activeTag")
        const tagContent = value
        tag.innerHTML = tagContent + "<i class='far fa-times-circle'></i>"
        this.container.appendChild(tag)

        return tag
    }
} 