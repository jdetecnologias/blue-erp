import axios from 'axios'
const BASE_URL = 'http://18.217.144.66:3003'


export  function importarEstoque(){
	return (dispatch, getState)=>{
	axios.get(`${BASE_URL}/estoque`,{headers:{'Content-Type': 'application/json'}})
	.then(resp=>dispatch({type:'IMPORT_ESTOQUE',payload: resp.data}))
	}
}

