import React from 'react'
import {connect} from 'react-redux'
import {setCookie,getCookie} from '../utils/cookies'
import Login from '../../pages/login/login.container'
import If from './if'

const Autenticar =  props => (
	<If test={props.auth} Else={<Login/>}>
		{props.children}
	</If>
	
)
const mapStateToProps = state =>({auth: state.auth.auth})
export default connect(mapStateToProps)(Autenticar)