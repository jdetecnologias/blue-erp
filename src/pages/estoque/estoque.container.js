import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {importarEstoque,setEstoque} from  './estoque.container.action'

import {importarProdutos} from './cadastrar.produto.action'
import {JoinArray, controlarTamanhoTela as CTT, obterTamanhoGrid as OTG} from '../../common/operator/funcoes'
import {Input,Form} from '../../common/layout/form'
import Grid from '../../common/layout/grid'
import Page from '../../common/layout/page'
import If from '../../common/operator/if'


class Estoque extends React.Component{
	constructor(props){
		super(props)
		this.state = {tamanhoTela:window.innerWidth}
		CTT(this)
	}
	componentWillMount(){
		this.props.importarEstoque()	
	}
	render(){
		console.log('status',this.props.estoque.status)
		const estoque = JoinArray(this.props.estoque.estoque,'codigo',this.props.produtos,'_id')
		
		return (
			<Page cols='12 12 12 11' title='Visualizar estoque'>
				<Grid cols='12' >
					<table className='table text-center'>
						<If test={this.state.tamanhoTela > OTG('xs')}>
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
						</If>
						<If test={this.state.tamanhoTela <= OTG('xs')}>
							{
									 estoque.map((item,key)=>{
										 if(item.join){
											return(
												<tr className={key%2 == 0 ? 'bg-secondary text-white' : 'bg-light text-dark'}>
													<tr>
														<td>{item.join.codigo}</td>
														<td colspan='2'>{item.join.descricaoCompleta}</td>
													</tr>
													<tr>
														<td>qtd Total</td>
														<td>qtd Disponível</td>		
														<td>qtd Alocada</td>												
													</tr>
													<tr>
														<td>{item.qtdTotal}</td>
														<td>{item.qtdDisponivel}</td>							
														<td>{item.qtdAlocada}</td>
													</tr>
												</tr>
											)
										 }
									})
							}
						</If>

					</table>
				</Grid>
			</Page>
		
		)
	}
}
const mapStateToProps = state => ({estoque: state.estoque, produtos: state.cadastroProduto.produtos})
const mapDispatchToProps = dispatch => bindActionCreators({importarEstoque,setEstoque,importarProdutos},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Estoque)