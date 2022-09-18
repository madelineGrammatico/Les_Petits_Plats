export default function createNewTag() {
    const container = document.querySelector('.tag__container')

    function createTag(value) {
        const tag = document.createElement("span")
        tag.classList.add("activeTag")
        const tagContent = value
        tag.innerHTML = tagContent + "<i class='far fa-times-circle'></i>"
        container.appendChild(tag)

        return tag
    }

    function displayTag(e, options) {
        const value = e.target.textContent
        const tag = createTag(value)
        let searchContainer
        switch (e.target.parentElement.classList[0]) {
            
            case 'ingredient__tag':
                options.ingredientsTagTab.add(value)
                tag.classList.add('tag--ingredient')
                searchContainer = document.querySelector(".ingredient__tag")
            break

            case 'appliance__tag': 
                options.appliancesTagTab.add(value)
                tag.classList.add('tag--appliance')
                searchContainer = document.querySelector(".appliance__tag")
            break
            case 'ustensil__tag' :
                options.ustensilsTagTab.add(value)
                tag.classList.add('tag--ustensil')
                searchContainer = document.querySelector(".ustensil__tag")
            break
        }
        let search = e.target
        searchContainer.removeChild(search)
        return tag
    }
    return {
        createTag,
        displayTag
    }
}