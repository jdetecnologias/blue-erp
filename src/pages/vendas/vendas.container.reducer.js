const INITIAL_STATE = {vendas:[],editarVenda:false}


export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case 'IMPORT_VENDAS':
			return {...state, vendas: action.payload}
		case 'ALLOW_EDIT_VENDA':
			return {...state, editarVenda:action.payload}
		default:
		return state
	}
	
}