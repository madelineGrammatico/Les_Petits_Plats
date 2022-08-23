import IngredientTag from "../tag/IngredientTag.js"
import ApplianceTag from "../tag/ApplianceTag.js"
import UstensilTag from "../tag/UstensilTag.js"

export default function tagFactory(e, options) {
    switch (e.target.parentElement.classList[0]) {
        case 'ingredient__tag':
            const ingredientTag = new IngredientTag(e, options)
            options = ingredientTag.displayTag(e, options)
            return options
            
        case 'appliance__tag': 
            const applianceTag = new ApplianceTag(e, options)
            // options.appliancesTagTab.add(e.target.textContent)
            return applianceTag.displayTag(e, options)
        case 'ustensil__tag' :
            const ustensilTag = new UstensilTag(e, options)
            // options.ustensilsTagTab.add(e.target.textContent)
            return ustensilTag.displayTag(e, options)
    }
}