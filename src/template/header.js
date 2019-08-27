import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {Deslogar} from '../pages/login/login.action'
import {switchMenu} from './menu.action'

class Header extends React.Component {
	constructor(props){
		super(props)	
	}

	render(){
		return(
		<nav className='navbar main-header text-white bg-primario row'>
			<div onClick={()=>this.props.switchMenu(this.props.menu.expandido)}><FontAwesomeIcon icon={faBars}  /></div>
			<div className='navbar-brand'>Azul ERP</div>
			<div className='navbar'><button onClick={this.props.Deslogar} className='btn btn-sm btn-danger'>Sair</button></div>
		</nav>
	)
	}
}

const mapStateToProps = state => ({menu: state.menu})
const mapDispatchToProps = dispatch=>bindActionCreators({Deslogar,switchMenu},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Header)