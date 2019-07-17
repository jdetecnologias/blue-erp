const INITIAL_STATE = {estoque:[],status:{}}


export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case  'IMPORT_ESTOQUE':
			return  {...state, estoque: action.payload}
		case  'STATUS_RESPONSE':
			return  {...state, status: action.payload}
		default:
			return state
	}
	
}