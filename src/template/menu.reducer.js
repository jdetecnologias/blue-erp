const INITIAL_STATE = {expandido: false}

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case 'SWITCH_MENU':
			return {...state, expandido: action.payload}
		default:
			return INITIAL_STATE
	}
}