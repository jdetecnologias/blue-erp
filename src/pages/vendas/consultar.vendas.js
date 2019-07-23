import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {importarVendas} from './vendas.action'
import {JoinArray} from '../../common/operator/funcoes'
import Grid from '../../common/layout/grid'
import Page from '../../common/layout/page'
import Row from '../../common/layout/row'
import If from '../../common/operator/if'
const bgPattern = 'bg-primary text-white'

class ConsultarEstoque extends React.Component{
	constructor(props){
		super(props)
		this.state = {vendaSelecionada:{nomeCliente:'', valorTotalPedido:'', itens:[], status:''},indiceItemSelecionado:-1}
		this.selecionarVenda = this.selecionarVenda.bind(this)
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
						<Grid cols='7' className={bgPattern}>
							<table className={'table table-sm '+bgPattern}>
								<thead>
									<tr><td>Cliente</td><td colspan='3'>{this.state.vendaSelecionada.nomeCliente}</td></tr>
									<tr>
										<td>Valor Total</td>
										<td>{this.state.vendaSelecionada.valorTotalPedido}</td>
										<td>Status</td>
										<td>{this.state.vendaSelecionada.status}</td></tr>
								</thead>
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
const mapDispatchToProps = dispatch=> bindActionCreators({importarVendas},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(ConsultarEstoque)