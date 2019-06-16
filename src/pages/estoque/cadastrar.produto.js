import React from 'react'
import {Input,Form} from '../../common/layout/form'
import Grid from '../../common/layout/grid'
import Page from '../../common/layout/page'

export default class Estoque extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<Page cols='11' title='Cadastrar produto'>
				<Grid cols='12 10 8 6 4' className='offset-sm-1 offset-md-2 offset-lg-3 offset-xl-4'>
					<h3 className='text-center'>Cadastrar Produto</h3>
					<Form cols='12'>
					<Input cols='12' placeholder='Descrição produto' label='Produto'/>
				</Form>
				<button className='btn btn-primary btn-sm'>Cadastrar</button>
				</Grid>
			</Page>
		
		)
	}
}