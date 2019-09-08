import axios from 'axios'
import {importarProdutos} from './cadastrar.produto.action'

const BASE_URL = 'https://azul-api.herokuapp.com'

export  function importarEstoque(){
	return (dispatch, getState)=>{
	axios.get(`${BASE_URL}/estoque`)
	.then(resp=>dispatch([{type:'IMPORT_ESTOQUE',payload: resp.data},importarProdutos()]))
	}
}

export  function setEstoque(estoque){
	return ({type:'IMPORT_ESTOQUE',payload: estoque})

}

