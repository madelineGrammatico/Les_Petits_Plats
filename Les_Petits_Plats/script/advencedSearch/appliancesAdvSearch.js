export default function appliancesAdvSearch() {
    function addSearchAppliances(options) {
        const searchsTagTab = new Set()
        Array.from(options.results).map((recipe) => {
            searchsTagTab.add(recipe.appliance.toLowerCase())
        })
        return searchsTagTab
    }
    return {addSearchAppliances}
}