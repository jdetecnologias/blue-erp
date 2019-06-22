const INITIAL_STATE = {produtos:[],containers:[{label:'T-shirt',value:'01'},{label:'Blusa',value:'02'}], subcontainers:[{label:'100% algodão',value:'01'},{label:'Suplex',value:'02'}],cores:[{label:'Branco',value:'00'},{label:'Vermelho',value:'01'},{label:'Preta',value:'02'}]}


export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case 'SAVE_PRODUCT':
			return {...state, produtos: action.payload}
		default:
		return state
	}
	
}