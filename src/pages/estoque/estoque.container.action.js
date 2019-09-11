import axios from 'axios'
import {importarProdutos} from './cadastrar.produto.action'
import config from '../../config/config'

const BASE_URL = config.base_url_api

export  function importarEstoque(){
	return (dispatch, getState)=>{
	axios.get(`${BASE_URL}/estoque`)
	.then(resp=>dispatch([{type:'IMPORT_ESTOQUE',payload: resp.data},importarProdutos()]))
	}
}

export  function setEstoque(estoque){
	return ({type:'IMPORT_ESTOQUE',payload: estoque})

}

