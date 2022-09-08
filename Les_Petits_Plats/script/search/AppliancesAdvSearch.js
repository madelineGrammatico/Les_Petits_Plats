export default class AppliancesAdvSearch {
    addSearchAppliances(options) {
        const searchsTagTab = new Set()
        for(let recipe of options.results) {
            searchsTagTab.add(recipe.appliance.toLowerCase())
        }

        return searchsTagTab
    }
}