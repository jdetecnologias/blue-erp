import {setCookie,getCookie} from '../../common/utils/cookies'

export function Logar(login=false,senha=false){
	let credentials = getCookie("credentials") == ""?{autorized:false}:JSON.parse(getCookie("credentials"))
	const autorizacao = login === 'admin' && senha === 'admin' || credentials.autorized
	credentials = {user: login, senha: senha, autorized: autorizacao}
	credentials = JSON.stringify(credentials)
	autorizacao? setCookie('credentials',credentials,7): setCookie('credentials',"",-7)
	
	return {
		type: 'AUTENTICACAO',
		payload: autorizacao
	}
}

export function Deslogar(){
		 setCookie('credentials',"",-7)
		const deslogar = window.confirm("Deseja realmente sair!")
			return {
				type: 'AUTENTICACAO',
				payload: !deslogar
			}

}

export  function RecuperarEmail(email){
	return {
		type: 'RETRIEVE_EMAIL',
		payload:email
	}
}

export function	TipEmail(e){
	return {
		type: 'RETRIEVE_EMAIL',
		payload:e.target.value
	}
}
