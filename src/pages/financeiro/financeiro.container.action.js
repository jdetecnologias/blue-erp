import axios from 'axios'
const BASE_URL = 'https://azul-api.herokuapp.com'


export  function importarFinanceiro(){

	return (dispatch, getState)=>{
		
	const request = axios.get(`${BASE_URL}/financeiro`)
	.then(res=>dispatch({type: 'IMPORT_FINANCEIRO', payload: res.data}))

	}

}
