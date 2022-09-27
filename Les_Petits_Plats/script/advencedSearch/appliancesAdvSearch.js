export default function appliancesAdvSearch() {
    function addSearchAppliances(options) {
        const searchsTagTab = new Set()
        options.results.forEach((recipe) => {
            searchsTagTab.add(recipe.appliance.toLowerCase())
        })
        return Array.from(searchsTagTab).sort()
    }
    return {addSearchAppliances}
}