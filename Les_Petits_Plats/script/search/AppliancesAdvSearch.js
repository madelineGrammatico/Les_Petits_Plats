export default class AppliancesAdvSearch {
    addSearchAppliances(options) {
        const searchsTagTab = new Set()
        options.results.forEach((recipe) => {
            searchsTagTab.add(recipe.appliance.toLowerCase())
        })

        return searchsTagTab
    }
}