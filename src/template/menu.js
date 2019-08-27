import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {switchMenu} from './menu.action'

import {LI,UL} from './submenu'
import If from '../common/operator/if'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faBarcode , faCartPlus, faCoins} from '@fortawesome/free-solid-svg-icons'


class Menu extends React.Component{

	constructor(props){
		super(props)		
		this.state = {
			expandido:false,
			estoque: {active:false},
			vendas:  {active:false},
			financeiro:  {active:false},
			produtos: {active:false}
		}
		this.switchSubMenu = this.switchSubMenu.bind(this)
	}

	switchSubMenu(aMenu){
		let state = this.state
		state[aMenu].active = !state[aMenu].active
		this.setState({state})
	}
	render(){
		return (
		<If test={this.props.menu.expandido}>
			<aside id='parent-menu' className='main-sidebar bg-secundario text-white' style={{position:'absolute',zIndex:99}}>
				<ul id='menu-lateral'>
					<li><a href='#'onClick={()=>this.switchSubMenu('estoque')}><FontAwesomeIcon icon={faBoxOpen} /> Estoque</a>
						<UL active={this.state.estoque.active}>
							<LI href='/estoque' label='Exibir Estoque' />
							<LI  href='/entrada' label='Entrada'/>							
						</UL>
					</li>
					<li><a href='#' onClick={()=>this.switchSubMenu('produtos')}><FontAwesomeIcon icon={faBarcode} /> Produto</a>
						<UL active={this.state.produtos.active}>
							<LI href='/produto' label='Cadastrar Produto' />						
						</UL>
					</li>	
					<li><a href='#' onClick={()=>this.switchSubMenu('vendas')}><FontAwesomeIcon icon={faCartPlus} />  Vendas</a>
						<UL active={this.state.vendas.active}>
							<LI href='/Venda' label='Criar venda' />			
							<LI href='/cvenda' label='Consultar Vendas' />								
						</UL>
					</li>
					<li><a href='#' onClick={()=>this.switchSubMenu('financeiro')}><FontAwesomeIcon icon={faCoins} /> Financeiro</a>
						<UL active={this.state.financeiro.active}>
							<LI href='/financeiro' label='Relatório Financeiro' />										
						</UL>
					</li>
				</ul>
			</aside>
			</If>
		)
	}
}
const mapStateToProps = state =>({menu:state.menu})
const mapDispatchToProsp  = dispatch => bindActionCreators({switchMenu},dispatch)
export default connect(mapStateToProps, mapDispatchToProsp)(Menu)
					//<li><a href='/insumo'>Insumo</a></li>
					//<li><a href='/producao'>Produção</a></li>										