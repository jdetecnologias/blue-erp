export function selectTab(tabId) {
	return {
		type: 'TAB_SELECTED',
		payload: tabId
	}
}


export function showTabs(...tabIds){
	const tabShows = {}
		tabIds.forEach(e=>tabShows[e] = true)
		return {type: 'TABS_TO_SHOW', payload: tabShows}
}