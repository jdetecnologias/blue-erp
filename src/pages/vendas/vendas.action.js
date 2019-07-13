import axios from 'axios'
const BASE_URL = 'http://18.217.144.66:3003'


export  function gravarVenda(Venda){

console.log(Venda)
	axios.post(`${BASE_URL}/vendas`,Venda,{headers:{'Content-Type': 'application/json'}}).then(resp=>{
		console.log(resp)
		
		})

}
