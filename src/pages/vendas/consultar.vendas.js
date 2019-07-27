import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {importarVendas,atualizarStatus} from './vendas.action'
import {JoinArray} from '../../common/operator/funcoes'
import Grid from '../../common/layout/grid'
import Page from '../../common/layout/page'
import Row from '../../common/layout/row'
import If from '../../common/operator/if'
const bgPattern = 'bg-info text-white'

class ConsultarEstoque extends React.Component{
	constructor(props){
		super(props)
		this.state = {vendaSelecionada:{_id:'',nomeCliente:'', valorTotalPedido:'', itens:[], status:''},indiceItemSelecionado:-1}
		this.selecionarVenda = this.selecionarVenda.bind(this)
		this.atualizarStatus = this.atualizarStatus.bind(this)
	}
	componentDidMount(){
		this.props.importarVendas()
	}	
	selecionarVenda(indice,e){
		const vendaSelecionada = this.props.vendas.vendas[indice]
		console.log(vendaSelecionada.itens)
		const itens = JoinArray(vendaSelecionada.itens,'produto',this.props.produtos,'_id')
		console.log(itens)
		vendaSelecionada.itens = itens
		
		this.setState({...this.state,vendaSelecionada,indiceItemSelecionado:indice})
	}
	atualizarStatus(tipo){
			let venda = this.state.vendaSelecionada
			const id = venda._id
			this.props.atualizarStatus(tipo,id)
	}
	render(){


		return(
			<Page cols='11' title='Consultar Vendas'>
				
				<Grid cols='12'>
					<Row>
						<Grid cols='5'>
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
						<Grid cols='7' >
						<If test={this.state.vendaSelecionada.status != ''}>
						<Grid cols='12' className=''>
							<If test={this.state.vendaSelecionada.status=='PENDENTE'}>
								<button type='button' onClick={()=> this.atualizarStatus('PAGO')} className='btn btn-success'>
									Finalizar venda
								</button>
							</If>
							<If test={this.state.vendaSelecionada.status == 'PENDENTE'}>
								<button type='button'  className='btn btn-primary '>
									Editar venda
								</button>
							</If>
								<button type='button' onClick={()=> this.atualizarStatus('CANCELADA')} className='btn btn-danger '>
									Cancelar venda
								</button>							
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
							</table>						
						</Grid>
					</Row>
				</Grid>
				
			</Page>
		)	
	}
}
const mapStateToProps = state=> ({vendas: state.vendas, produtos:state.cadastroProduto.produtos})
const mapDispatchToProps = dispatch=> bindActionCreators({importarVendas,atualizarStatus},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(ConsultarEstoque)