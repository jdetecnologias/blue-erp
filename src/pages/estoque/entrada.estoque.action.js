import axios from 'axios'
const BASE_URL = 'http://18.217.144.66:3003'


export  function gravarEstoque(estoque){
	return (dispatch, getState)=>{
	axios.post(`${BASE_URL}/estoque`,estoque,{headers:{'Content-Type': 'application/json'}})
	.then(resp=>dispatch({type:'STATUS_RESPONSE',payload:resp.data}))
	}
}
export  function setStatusResp( ){
	return {type:'STATUS_RESPONSE',payload:{}}
}

