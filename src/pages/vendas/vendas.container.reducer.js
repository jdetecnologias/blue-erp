const INITIAL_STATE = {vendas:[]}


export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case 'IMPORT_VENDAS':
			return {...state, vendas: action.payload}
		default:
		return state
	}
	
}