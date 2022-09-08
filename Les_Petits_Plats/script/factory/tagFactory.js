import IngredientTag from "../tag/IngredientTag.js"
import ApplianceTag from "../tag/ApplianceTag.js"
import UstensilTag from "../tag/UstensilTag.js"

export default function tagFactory(e) {
    let newTag
    switch (e.target.parentElement.classList[0]) {
        
        case 'ingredient__tag':
            newTag = new IngredientTag()
        return newTag

        case 'appliance__tag': 
        newTag = new ApplianceTag()
        return newTag

        case 'ustensil__tag' :
            newTag = new UstensilTag()
        return newTag
    }
}