import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {importarEstoque,setEstoque} from  './estoque.container.action'

import {importarProdutos} from './cadastrar.produto.action'
import {JoinArray} from '../../common/operator/funcoes'
import {Input,Form} from '../../common/layout/form'
import Grid from '../../common/layout/grid'
import Page from '../../common/layout/page'


class Estoque extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		this.props.importarEstoque()	
	}
	render(){
		const estoque = JoinArray(this.props.estoque.estoque,'codigo',this.props.produtos,'_id')
		
		console.log(estoque)
	
		return (
			<Page cols='11' title='Visualizar estoque'>
				<Grid cols='12 10 8'  className='offset-sm-1 offset-md-2'>
					<table className='table text-center'>
						<tr className='bg-secondary text-white'>
							<td>Cod.</td>
							<td>Produto</td>
							<td>qtd Total</td>
							<td>qtd Disponível</td>		
							<td>qtd Alocada</td>

						</tr>
						{
								 estoque.map(item=>{
									 if(item.join){
										return(
											<tr>
												<td>{item.join.codigo}</td>
												<td>{item.join.descricaoCompleta}</td>
												<td>{item.qtdTotal}</td>
												<td>{item.qtdDisponivel}</td>							
												<td>{item.qtdAlocada}</td>
											</tr>
										)
									 }
								})
						}
					</table>
				</Grid>
			</Page>
		
		)
	}
}
const mapStateToProps = state => ({estoque: state.estoque, produtos: state.cadastroProduto.produtos})
const mapDispatchToProps = dispatch => bindActionCreators({importarEstoque,setEstoque,importarProdutos},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Estoque)