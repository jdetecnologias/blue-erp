import axios from 'axios'
import config from '../../config/config'

const BASE_URL = config.base_url_api

export  function importarFinanceiro(){

	return (dispatch, getState)=>{
		
	const request = axios.get(`${BASE_URL}/financeiro`)
	.then(res=>dispatch({type: 'IMPORT_FINANCEIRO', payload: res.data}))

	}

}
