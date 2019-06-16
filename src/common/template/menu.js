import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'
import {connect} from 'react-redux'
import {Deslogar} from '../../login/loginActions'
import {bindActionCreators} from 'redux'

function fecharMenu(){
	document.body.classList.remove('sidebar-open')
}

const Menu =  props => (
		<ul className='sidebar-menu tree' data-widget='tree'>
			<MenuItem  path='javascript: void(0);' className='text-center' label='Fechar Menu' btnOnclick={fecharMenu} />
			<MenuItem path='#' label='Home' icon='home' btnOnclick={fecharMenu} />
			<MenuItem path='#/pedidos' label='Meus Pedidos' btnOnclick={fecharMenu} icon='truck' />
			<MenuItem path='#/carrinho' label='Carrinho de compras' btnOnclick={fecharMenu} icon='opencart' /> 
			<MenuItem icon='sign-out' path='#/' label='Sair' btnOnclick={props.Deslogar}/>
		</ul>
	)

const mapDispatchToProps = dispatch=> bindActionCreators({Deslogar},dispatch)
export default connect(null,mapDispatchToProps)(Menu)