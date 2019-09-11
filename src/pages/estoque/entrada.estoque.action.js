import axios from 'axios'
import config from '../../config/config'

const BASE_URL = config.base_url_api


export  function gravarEstoque(estoque){
	return (dispatch, getState)=>{
	axios.post(`${BASE_URL}/estoque`,estoque,{headers:{'Content-Type': 'application/json'}})
	.then(resp=>dispatch({type:'STATUS_RESPONSE',payload:resp.data}))
	}
}
export  function setStatusResp( ){
	return {type:'STATUS_RESPONSE',payload:{}}
}

