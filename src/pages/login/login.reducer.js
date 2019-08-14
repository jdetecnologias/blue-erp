const INITIAL_STATE = {auth:false,email:""}

export default function (state = INITIAL_STATE,action){
	switch(action.type){
		case 'AUTENTICACAO':
			return { ...state, auth:action.payload }
		case 'RETRIEVE_EMAIL':
			return {...state, email: action.payload}
		default:
			return state
	}
	
}
