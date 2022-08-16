export default class Tag {
    constructor() {
        this.container = document.querySelector('.tag__container')
    }
    createTag(value, options) {
        console.log(value)
        options.tagTab.add(value)
        const tag = document.createElement("span")
        tag.classList.add("activeTag")
        const tagContent = value
        tag.innerHTML = tagContent + "<i class='far fa-times-circle'></i>"
        this.container.appendChild(tag)
        tag.addEventListener('click', (e) => this.removeTag(e, options))
        return tag
    }

    removeTag(e, options) {
        options.tagTab.delete(e.target.textContent)
        let tag
        (e.target.classList[0] === "far" ) ? tag = e.target.parentNode : tag = e.target
        this.container.removeChild(tag)
    }
}