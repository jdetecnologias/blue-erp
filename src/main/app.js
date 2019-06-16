import React from 'react'	
import Header from '../template/header'
import Footer from '../template/footer'
import Menu from '../template/menu'
import Row from '../common/layout/row'
import Router from './router'

export default props=>(
	<div  className='container-fluid'>
		<Header/>
		<Row className='row'>
			<Menu/>
			<Router />
		</Row>
		<Footer/>
	</div>
)