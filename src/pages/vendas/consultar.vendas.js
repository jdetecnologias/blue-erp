import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {importarVendas,atualizarStatus,EditarVenda} from './vendas.action'
import {JoinArray, controlarTamanhoTela as CTT , obterTamanhoGrid as OTG} from '../../common/operator/funcoes'
import Grid from '../../common/layout/grid'
import Page from '../../common/layout/page'
import Row from '../../common/layout/row'
import If from '../../common/operator/if'
import FormVenda from './vendas.container'
const bgPattern = 'bg-info text-white'

class ConsultarEstoque extends React.Component{
	constructor(props){
		super(props)
		this.state = {tamanhoTela:window.innerWidth,vendaSelecionada:{_id:'',nomeCliente:'', valorTotalPedido:'', itens:[], status:''},indiceItemSelecionado:-1,dadosParaEditarVenda:{}}
		this.selecionarVenda = this.selecionarVenda.bind(this)
		this.atualizarStatus = this.atualizarStatus.bind(this)
		this.editarVenda = this.editarVenda.bind(this)
		CTT(this)
	}
	componentDidMount(){
		this.props.importarVendas()
	}	
	selecionarVenda(indice,e){
		const vendaSelecionada = this.props.vendas.vendas[indice]
		console.log(vendaSelecionada.itens)
		const itens = JoinArray(vendaSelecionada.itens,'produto',this.props.produtos,'_id')
		vendaSelecionada.itens = itens
		
		this.setState({...this.state,vendaSelecionada,indiceItemSelecionado:indice})
	}
	atualizarStatus(tipo){
			let venda = this.state.vendaSelecionada
			const id = venda._id
			venda.status = tipo
			this.props.atualizarStatus(tipo,id)
			this.setState({...this.state, vendaSelecionada:venda})
	}
	editarVenda(){
		const itens = this.state.vendaSelecionada.itens
		let itensAux = []
		const dadosParaEditarVenda = this.state.vendaSelecionada
		itens.map(item=>{
			item.descProduto = item.join.descricaoCompleta
			delete item.join
			itensAux.push(item)
		})
		console.log('itens',itens)
		dadosParaEditarVenda.itens = itensAux
		console.log(dadosParaEditarVenda)

		debugger
		this.setState({...this.state,dadosParaEditarVenda})
		this.props.EditarVenda(!this.props.vendas.editarVenda)
	}
	render(){

			console.log(this.state.tamanhoTela , OTG('xs'),this.state.tamanhoTela <= OTG('xs'))
		return(
		<Grid cols='12 11'>
			<If test={!this.props.vendas.editarVenda}>
				<Page cols='11' title='Consultar Vendas'>
					
					<Grid cols='12'>
						<Row>
							<Grid cols='12 12 5'>
								<table className='table table-sm'>
									<thead>
										<tr><th>Cliente</th><th>Valor total</th></tr>
									</thead>
									<tbody>
									{this.props.vendas.vendas.map((venda,key)=>{
										
										return <tr className={this.state.indiceItemSelecionado === key ? bgPattern:''} onClick={(e)=>this.selecionarVenda(key,e)}><td>{venda.nomeCliente}</td><td>{venda.valorTotalPedido}</td></tr>
									})}
									</tbody>
								</table>
							</Grid>
							<Grid cols='12 12 12 7' >
								<If test={this.state.vendaSelecionada.status != ''}>
									<Grid cols='12' className=''>
										<If test={this.state.vendaSelecionada.status=='PENDENTE'}>
											<button type='button' onClick={()=> this.atualizarStatus('PAGO')} className='btn btn-success'>
												Finalizar
											</button>
										</If>
										<If test={false/*this.state.vendaSelecionada.status == 'PENDENTE'*/}>
											<button onClick={this.editarVenda} type='button'  className='btn btn-primary '>
												Editar venda
											</button>
										</If>
										<If test={this.state.vendaSelecionada.status == 'PENDENTE'}>
											<button type='button' onClick={()=> this.atualizarStatus('CANCELADA')} className='btn btn-danger '>
												Cancelar
											</button>	
										</If>								
									</Grid>
								</If>
								<table className='table table-sm '>
									<thead>
										<tr><td>Cliente</td><td colspan='3'>{this.state.vendaSelecionada.nomeCliente}</td></tr>
										<tr>
											<td>Valor Total</td>
											<td>{this.state.vendaSelecionada.valorTotalPedido}</td>
											<td>Status</td>
											<td>{this.state.vendaSelecionada.status}</td></tr>
									</thead>
									</table>
									<table className='table table-sm '>
									<If test={this.state.tamanhoTela > OTG('xs')}>
										<tbody>
											<tr className='text-center'><th>Produto</th><th>Qtd</th><th>V. Unit</th><th>V. Total</th></tr>
											{
												this.state.vendaSelecionada.itens.map((item,key)=>{
													
													if(item.join){
													return <tr><td>{item.join.descricaoCompleta}</td><td>{item.qtd}</td><td>{item.valorUnitario}</td><td>{item.valorUnitario*item.qtd}</td></tr>
													}
												})
											}
										</tbody>
									</If>
									<If test={this.state.tamanhoTela <= OTG('xs')}>
										<tbody>
											{
												this.state.vendaSelecionada.itens.map((item,key)=>{
													
													if(item.join){
													return (
														<tr className={key%2 == 0 ? 'bg-secondary text-white' : 'bg-light text-dark'}>
															<tr><td colspan='3'>{item.join.descricaoCompleta}</td></tr>
															<tr>
																<td>Qtd</td>
																<td>V. Unit</td>
																<td>V.Total</td>															
															</tr>															
															<tr>
																<td>{item.qtd}</td>
																<td>{item.valorUnitario}</td>
																<td>{item.valorUnitario*item.qtd}</td>															
															</tr>
														</tr>)
													}
												})
											}
										</tbody>
									</If>
								</table>						
							</Grid>
						</Row>
					</Grid>
					
				</Page>
			</If>
			<If test={this.props.vendas.editarVenda}>
				<FormVenda state={this.state.dadosParaEditarVenda}/>
			</If>
		</Grid>
		)	
	}
}
const mapStateToProps = state=> ({vendas: state.vendas, produtos:state.cadastroProduto.produtos})
const mapDispatchToProps = dispatch=> bindActionCreators({importarVendas,atualizarStatus,EditarVenda},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(ConsultarEstoque)