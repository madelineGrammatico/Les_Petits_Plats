import IngredientTag from "../tag/IngredientTag.js"
import ApplianceTag from "../tag/ApplianceTag.js"
import UstensilTag from "../tag/UstensilTag.js"

export default function tagFactory(e) {
    switch (e.target.parentElement.classList[0]) {
        case 'ingredient__tag':
            const ingredientTag = new IngredientTag()
            return ingredientTag

        case 'appliance__tag': 
            const applianceTag = new ApplianceTag()
            return applianceTag

        case 'ustensil__tag' :
            const ustensilTag = new UstensilTag()
            return ustensilTag
    }
}