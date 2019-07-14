import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {importarEstoque} from './estoque.container.action'

import {Input,Form} from '../../common/layout/form'
import Grid from '../../common/layout/grid'
import Page from '../../common/layout/page'

class Estoque extends React.Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.importarEstoque()
	}
	render(){
		console.log(this.props.estoque)
		return (
			<Page cols='11' title='Visualizar estoque'>
				<Grid cols='12 10 8 6'  className='offset-sm-1 offset-md-2 offset-lg-3'>
					<table className='table'>
						<tr className='bg-secondary text-white'>
							<td>Produto</td>
							<td>Lote</td>
							<td>Tamanho</td>							
							<td>Qtd</td>
						</tr>
						<tr>
							<td>300001  - Camiseta Mulher Maravilha</td>
							<td>20190520</td>
							<td>M</td>							
							<td>20</td>
						</tr>
					</table>
				</Grid>
			</Page>
		
		)
	}
}
const mapStateToProps = state => ({estoque: state.estoque})
const mapDispatchToProps = dispatch => bindActionCreators({importarEstoque},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Estoque)