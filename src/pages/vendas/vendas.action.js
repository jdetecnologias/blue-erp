import axios from 'axios'
import {importarProdutos} from '../estoque/cadastrar.produto.action'
const BASE_URL = 'http://18.217.144.66:3003'


export  function gravarVenda(Venda){

console.log(Venda)
	axios.post(`${BASE_URL}/vendas`,Venda,{headers:{'Content-Type': 'application/json'}}).then(resp=>{
		console.log(resp)
		
		})

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
