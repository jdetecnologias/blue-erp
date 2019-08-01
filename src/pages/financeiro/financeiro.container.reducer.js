const INITIAL_STATE = {financeiro:[]}

export default function(state = INITIAL_STATE,action){
	switch(action.type){
		case 'IMPORT_FINANCEIRO':
			return {...state, financeiro: action.payload}
		default:
			return state
	}
}