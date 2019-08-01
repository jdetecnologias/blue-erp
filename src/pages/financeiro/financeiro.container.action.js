import axios from 'axios'
const BASE_URL = 'http://18.217.144.66:3003'


export  function importarFinanceiro(){

	return (dispatch, getState)=>{
		
	const request = axios.get(`${BASE_URL}/financeiro`)
	.then(res=>dispatch({type: 'IMPORT_FINANCEIRO', payload: res.data}))

	}

}
