const INITIAL_STATE = {estoque:[]}


export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case  'IMPORT_ESTOQUE':
			return  {...state, estoque: action.payload}
		default:
			return state
	}
	
}