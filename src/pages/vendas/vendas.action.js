import axios from 'axios'
import {importarProdutos} from '../estoque/cadastrar.produto.action'
const BASE_URL = 'https://azul-api.herokuapp.com'


export  function gravarVenda(Venda){
	if(Venda._id){
		axios.post(`${BASE_URL}/atualizarVenda`,Venda,{headers:{'Content-Type': 'application/json'}}).then(resp=>{
			console.log(resp)
		})
	}
	else{
		axios.post(`${BASE_URL}/vendas`,Venda,{headers:{'Content-Type': 'application/json'}}).then(resp=>{
			console.log(resp)
		})	
	}

}

export  function importarVendas(){

	return (dispatch, getState)=>{
		
	const request = axios.get(`${BASE_URL}/vendas`)
	.then(res=>dispatch([{type: 'IMPORT_VENDAS', payload: res.data},importarProdutos()]))

	}

}

export function atualizarStatus(tipo,id){
	let url,resposta;
	
	return (dispatch, getState)=>{
		switch(tipo){
			case 'PAGO':
				resposta = window.confirm('Deseja realmente FINALIZAR a venda?')
				resposta?url = `${BASE_URL}/finalizarVenda`:url=false
			break
			case 'CANCELADA':
				resposta = window.confirm('Deseja realmente CANCELAR a venda?')
				resposta?url = `${BASE_URL}/cancelarVenda`:url=false
			break
		}
		if(url){
			axios.put(url,{_id:id})
			.then(res=>dispatch([importarVendas()]))
		}

	}
}

export function EditarVenda(Tboolean){
	return {type: 'ALLOW_EDIT_VENDA', payload:Tboolean}
}