import React from 'react'
import {LI,UL} from './submenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faBarcode , faCartPlus, faCoins} from '@fortawesome/free-solid-svg-icons'

export default class Menu extends React.Component{

	constructor(props){
		super(props)		
		this.state = {
			expandido:false,
			estoque: {active:false},
			vendas:  {active:false},
			financeiro:  {active:false},
			produtos: {active:false}
		}
		this.switchMenu = this.switchMenu.bind(this)
		this.switchSubMenu = this.switchSubMenu.bind(this)
		this.fecharTodosSubmenus = this.fecharTodosSubmenus.bind(this)
		const  _this = this
		document.body.onclick = function(e){
			const lTarget = e.target
			console.log(lTarget,e.currentTarget )
			if(lTarget.getAttribute('id') == 'menu-lateral'){
				_this.switchMenu()
			}else if(lTarget.getAttribute('id') ==  'parent-menu'){
					_this.fecharTodosSubmenus()
					_this.switchMenu()				
			}else{
				if(_this.state.expandido){
					_this.fecharTodosSubmenus()
					_this.switchMenu()
				}
			}
		}
	}

	switchMenu(){
		this.setState({...this.state, expandido:!this.state.expandido})
	}
	fecharTodosSubmenus(){
		let state = this.state
		
		state.estoque.active = false
		state.vendas.active = false
		state.financeiro.active = false
		state.produtos.active = false
		
	}
	switchSubMenu(aMenu){
		let state = this.state
		state[aMenu].active = !state[aMenu].active
		this.setState({state})
	}
	render(){
		const lPosition = this.state.expandido? 'absolute': 'relative'
		return (
			<aside id='parent-menu' className='main-sidebar bg-secundario text-white d-none d-lg-block' onClick={()=>this.switchMenu()} style={{position:lPosition,zIndex:99}}>
				<ul id='menu-lateral'>
					<li><a href='#'onClick={()=>this.switchSubMenu('estoque')}><FontAwesomeIcon icon={faBoxOpen} /> {this.state.expandido?'Estoque':''}</a>
						<UL active={this.state.estoque.active}>
							<LI href='/estoque' label='Exibir Estoque' />
							<LI  href='/entrada' label='Entrada'/>							
						</UL>
					</li>
					<li><a href='#' onClick={()=>this.switchSubMenu('produtos')}><FontAwesomeIcon icon={faBarcode} /> {this.state.expandido?'Produto':''}</a>
						<UL active={this.state.produtos.active}>
							<LI href='/produto' label='Cadastrar Produto' />						
						</UL>
					</li>	
					<li><a href='#' onClick={()=>this.switchSubMenu('vendas')}><FontAwesomeIcon icon={faCartPlus} /> {this.state.expandido?'Vendas':''}</a>
						<UL active={this.state.vendas.active}>
							<LI href='/Venda' label='Criar venda' />			
							<LI href='/cvenda' label='Consultar Vendas' />								
						</UL>
					</li>
					<li><a href='#' onClick={()=>this.switchSubMenu('financeiro')}><FontAwesomeIcon icon={faCoins} /> {this.state.expandido?'Financeiro':''}</a>
						<UL active={this.state.financeiro.active}>
							<LI href='/financeiro' label='Relatório Financeiro' />										
						</UL>
					</li>
				</ul>
			</aside>
		)
	}
}

					//<li><a href='/insumo'>Insumo</a></li>
					//<li><a href='/producao'>Produção</a></li>
					//
					//<li><a href='/cvenda'>Consultar Venda</a></li>										