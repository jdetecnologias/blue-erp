import axios from 'axios'
import {importarProdutos} from './cadastrar.produto.action'

const BASE_URL = 'http://18.217.144.66:3003'

export  function importarEstoque(){
	return (dispatch, getState)=>{
	axios.get(`${BASE_URL}/estoque`)
	.then(resp=>dispatch([{type:'IMPORT_ESTOQUE',payload: resp.data},importarProdutos()]))
	}
}

export  function setEstoque(estoque){
	return ({type:'IMPORT_ESTOQUE',payload: estoque})

}

