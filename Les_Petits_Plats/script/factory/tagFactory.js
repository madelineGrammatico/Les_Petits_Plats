import IngredientTag from "../tag/IngredientTag.js"
import ApplianceTag from "../tag/ApplianceTag.js"
import UstensilTag from "../tag/UstensilTag.js"

export default function tagFactory(e, options, recipes) {
    switch (e.target.parentElement.classList[0]) {
        case 'ingredient__tag':
            const ingredientTag = new IngredientTag(recipes)
            options = ingredientTag.displayTag(e, options)
            return options
            
        case 'appliance__tag': 
            const applianceTag = new ApplianceTag(recipes)
            options = applianceTag.displayTag(e, options)
            return options
        case 'ustensil__tag' :
            const ustensilTag = new UstensilTag(recipes)
            options = ustensilTag.displayTag(e, options)
            return options
    }
}