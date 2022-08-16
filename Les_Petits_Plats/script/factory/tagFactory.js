import IngredientTag from "../tag/IngredientTag.js"
import ApplianceTag from "../tag/ApplianceTag.js"
import UstensilTag from "../tag/UstensilTag.js"

export default function tagFactory(e, options) {
    console.log(options.ingredientsTagTab)
    switch (e.target.parentElement.classList[0]) {
        case 'ingredient__tag':
            const ingredientTag = new IngredientTag(e.target.textContent, options)
            // options.ingredientsTagTab.add(e.target.textContent)
            return ingredientTag.displayTag(e, options)
        case 'appliance__tag': 
            const applianceTag = new ApplianceTag(e, options)
            // options.appliancesTagTab.add(e.target.textContent)
            return applianceTag.displayTag(e.target.textContent, options)
        case 'ustensil__tag' :
            const ustensilTag = new UstensilTag(e, options)
            // options.ustensilsTagTab.add(e.target.textContent)
            return ustensilTag.displayTag(e.target.textContent, options)
    }
}