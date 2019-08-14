import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {Deslogar} from '../pages/login/login.action'

class Header extends React.Component {
	constructor(props){
		super(props)	
	}

	render(){
		return(
		<nav className='navbar main-header text-white bg-primario row'>
			<div className='navbar-brand'>Azul ERP</div>
			<div className='navbar'><button onClick={this.props.Deslogar} className='btn btn-sm btn-danger'>Sair</button></div>
		</nav>
	)
	}
}
const mapDispatchToProps = dispatch=>bindActionCreators({Deslogar},dispatch)
export default connect(null,mapDispatchToProps)(Header)