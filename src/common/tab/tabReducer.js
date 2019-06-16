const INITIAL_STATE = {selected: '' ,visibles: {} }

export default (state = INITIAL_STATE, action ) => {
	switch(action.type){
		case  'TAB_SELECTED'	:
			return {...state, selected: action.payload}
		case 'TABS_TO_SHOW' :
			return {...state, visibles: action.payload}
		default:
			return state
	}
	
}