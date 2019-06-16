import React from 'react'
import Grid from '../../common/layout/grid'
import Page from '../../common/layout/page'
import {Input, Form} from '../../common/layout/form'


export default props => (
	<Page cols='11' title='Vendas'>
		<Grid cols='12 4' className='offset-sm-4'>
			<Form cols='12'>
				<Input cols='12'  placeholder='Cliente'/>
				<Input cols='12'  placeholder='Produto' />
				<Input cols='12 2'  placeholder='Qtd' />
				<Input cols='12 5'  placeholder='Valor unitário' />
				<Input cols='12 5'  placeholder='Valor Total' />
			</Form>
			<button className='btn btn-primary btn-sm'>Gravar</button>
		</Grid>
	</Page>
)