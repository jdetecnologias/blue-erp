import axios from 'axios'
import config from '../../config/config'

const BASE_URL = config.base_url_api


export  function gravarProduto(produto){
	return (dispatch, getState)=>{
	axios.post(`${BASE_URL}/produto`,produto,{headers:{'Content-Type': 'application/json'}}).then(resp=>dispatch(importarProdutos()))
	}
}

export const importarProdutos = () => {
	return (dispatch, getState)=>{
		
	const request = axios.get(`${BASE_URL}/produto`)
	.then(res=>dispatch({type: 'IMPORT_PRODUCTS', payload: res.data}))

	}
}