import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Input,Form} from '../../common/layout/form'
import Grid from '../../common/layout/grid'
import Page from '../../common/layout/page'

export default class Estoque extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<Page cols='11' title='Entrada mercadoria no estoque'> 
					<Grid cols='12 10 8 6 4' className='offset-sm-1 offset-md-2 offset-lg-3 offset-xl-4'>
						<Form cols='12'>
						<Input cols='12 4' placeholder='Código produto' label='Código'/>
						<Input cols='6 2' placeholder='Qtd.' label='Qtd'/>
					</Form>
					<button className='btn btn-primary btn-sm'>Registrar mercadoria</button>
					</Grid>
			</Page>
		
		)
	}
}