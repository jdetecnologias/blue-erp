import React from 'react'
import {Input, Form, Select } from '../../common/layout/form'
import Grid from '../../common/layout/grid'
import Row from '../../common/layout/row'
import Page from '../../common/layout/page'


export default props =>(
	<Page title='Cadastro' cols='11'>
		<Row cols='12'>
			<Grid cols='12 6'>
					<Form cols='12'>
						<Input placeholder='Matéria prima' cols='12'/>
						<Input placeholder='qtd' cols='12 6'/>
						<Select cols='3' options={[{value:'KG',label:'Kilos'},{value:'M',label:'Metros'}]} />
						<Input placeholder='Valor unitário' cols='12 6'/>
						<Input placeholder='Valor Total' cols='12 6'/>
					</Form>
			</Grid>
		</Row>
		<button className='btn btn-primary'>Gravar</button>
	</Page>
)