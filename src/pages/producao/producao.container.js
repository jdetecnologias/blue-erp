import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {Input, Form, Select } from '../../common/layout/form'
import Grid from '../../common/layout/grid'
import Page from '../../common/layout/page'



class Producao extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		const unidadeMedida = this.props.producao.unidadeMedida;               
		return (<Page title='Produção' cols='11'> 
			<Grid cols='12 6'>
				<Form cols='12'>
					<Input placeholder='Matéria Prima' cols='12'/>
					<Input placeholder='Qtd' cols='6 3'/>
					<Select cols='3' options={unidadeMedida}/>
				</Form>
			</Grid>
		</Page>
		)
	}
}
const mapStateToProps = state => ({producao: state.producao})
export default connect(mapStateToProps)(Producao);