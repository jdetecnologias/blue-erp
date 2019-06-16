import React from 'react'
import {Input, Form, Select } from '../../common/layout/form'
import Grid from '../../common/layout/grid'
import Page from '../../common/layout/page'


export default props =>(
	<Page title='Cadastro' cols='11'>
		<Grid cols='12 6'>
			<Form cols='12'>
				<Input placeholder='Insumo' cols='12'/>
				<Select cols='3' options={[{value:'KG',label:'KG'},{value:'M',label:'M'}]}/>
				<Input placeholder='Produto Gerado' cols='12'/>
				<Input placeholder='Qtd Gerado' cols='12'/>
			</Form>
		</Grid>
		<button className='btn btn-primary'>Gravar</button>
	</Page>
)