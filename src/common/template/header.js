import React from 'react'
import MenuItem from './menuItem'
import If from '../operator/if'
import {connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import {GetItensShopCar} from '../../carrinho/carrinhoActions'
import {Deslogar} from '../../login/loginActions'

class Header extends React.Component{ 
	constructor(props){
		super(props)
	}
	componentWillMount(){
		this.props.GetItensShopCar()
	}

	render(){
		return(
				<header className='main-header'>
					<nav id='nav-principal' className='nav navbar-light bg-navbar navbar-expand-lg'>
						<a href className='sidebar-toggle' data-toggle='offcanvas'></a>
						<div className='navbar-brand'>
							<a href='#/'>Vendaki</a>
						</div>
						<div className='navbar navbar-custom-menu d-none d-lg-block no-padding'>
							<ul className='nav navbar-nav'>
								<MenuItem path='#/pedidos' icon='truck'/>
								<MenuItem  path='#/carrinho'  icon='opencart'>
									<span className='label label-warning pull-right'>{this.props.qtdItens}</span>
								</MenuItem>
								<MenuItem icon='sign-out' path='#/' btnOnclick={this.props.Deslogar}/>
							</ul>
						</div>
					</nav>
				</header>
		)
	}
}
const mapStateToProps = state => ({qtdItens:state.dashboard.qtdItens})
const mapDispatchToProps = dispatch => bindActionCreators({GetItensShopCar,Deslogar},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Header)