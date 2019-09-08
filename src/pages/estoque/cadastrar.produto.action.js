import axios from 'axios'
const BASE_URL = 'https://azul-api.herokuapp.com'


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