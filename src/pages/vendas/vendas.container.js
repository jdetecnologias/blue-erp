import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {importarProdutos} from '../estoque/cadastrar.produto.action'

import{gravarVenda} from './vendas.action'
import Grid from '../../common/layout/grid'
import Page from '../../common/layout/page'
import Row from '../../common/layout/row'
import {Input, Form,Select} from '../../common/layout/form'
import {optionProdutos,resetarCamposSelect} from '../../common/operator/funcoes'

const INITIAL_ITEM = ()=>({produto:'',descProduto:'', qtd:'',valorUnitario:''})
const INITIAL_STATE = ()=>({nomeCliente:'',item:INITIAL_ITEM(),itens:[],selectCampos:[],valorTotalPedido: 0,status:'PENDENTE'})

class FormVendas extends React.Component{
	constructor(props){
		super(props)
		this.state = INITIAL_STATE()
		this.preencheCampos = this.preencheCampos.bind(this)
		this.adicionarItem = this.adicionarItem.bind(this)
		this.finalizarVenda = this.finalizarVenda.bind(this)
	}

	preencheCampos(e){
		const campo = e.target.getAttribute('id')
		let state = this.state
		let campos = state.selectCampos
		let item = this.state.item
		switch(campo){
			case 'nomeCliente':
				state.nomeCliente = e.target.value
			break;
			case 'qtd':
				 if(!isNaN(e.target.value)){item.qtd = (e.target.value)}
			break;
			case 'vlunitario':
				if( !isNaN(e.target.value.replace(',','.'))){item.valorUnitario = e.target.value.replace(',','.')}
			break;
			case 'produto':
				item.produto = e.target.value
				const textoProduto = e.target.options[e.target.selectedIndex].text
				campos.push(e.target)
				state.campos = campos
				item.descProduto =textoProduto
			break;
			case 'statusPedido':
				state.status = e.target.value
				campos.push(e.target)
				state.campos = campos
			break;
		
		}
		state.item =item
		this.setState({...this.state,item: state.item})
	}
	componentDidMount(){
		this.props.importarProdutos()
	}
	adicionarItem (){
		let state = this.state
		const objetoItem = {
							produto:state.item.produto
							,descProduto:state.item.descProduto
							, qtd:parseFloat(state.item.qtd)
							,valorUnitario:parseFloat(state.item.valorUnitario)
						}
		let itens = state.itens
		itens.push(objetoItem)
		state.itens = itens
		let valorTotalPedido = state.valorTotalPedido
		valorTotalPedido += parseFloat(state.item.qtd)*parseFloat(state.item.valorUnitario)
		state.item = INITIAL_ITEM()
		state.valorTotalPedido = valorTotalPedido
		this.setState( state)
		resetarCamposSelect(this.state.campos)
	}
	finalizarVenda(){
		const state = this.state;
		let venda =  {nomeCliente:state.nomeCliente,itens:state.itens,valorTotalPedido:state.valorTotalPedido,status:state.status}
		gravarVenda(venda)
		this.setState(INITIAL_STATE())
	}
	render(){
		return(
			<Page cols='11' title='Vendas'>
				<Row>
					<Grid cols='12 4'>
						<Form cols='12'>
							<Input cols='12'  id='nomeCliente' placeholder='Cliente' valor={this.state.nomeCliente} onChange={this.preencheCampos}/>
							<Select cols='12'  id='produto' label='Produto'  onChange={this.preencheCampos} options={optionProdutos(this.props.cadastroProduto.produtos)} />
							<Input cols='12 2'  placeholder='Qtd'  valor={this.state.item.qtd} id='qtd'  onChange={this.preencheCampos}/>
							<Input cols='12 5'  placeholder='Valor unitário' valor={this.state.item.valorUnitario} id='vlunitario' onChange={this.preencheCampos}/>
							<Input cols='12 5'  placeholder='Total' valor={parseFloat(this.state.item.valorUnitario*this.state.item.qtd).toFixed(2)} id='vlTotal'/>
						</Form>
						<button className='btn btn-primary btn-sm' onClick={this.adicionarItem}>Adicionar Produto</button>
					</Grid>
					<Grid cols='12 6'>
						<h3 className='text-center'>Dados do pedido </h3>

						<table className='table'>
							<tr><td>Nome do cliente:</td><td colspan='3'>{this.state.nomeCliente}</td> </tr>
							<tr><td colspan='4' className='text-center'>Itens</td> </tr>
							<tr><td>Produto</td><td>Qtd</td><td>V. unit</td><td>Total</td></tr>
							{
								this.state.itens.map((item,key)=>{
									return(<tr>
										<td>{item.descProduto}</td>
										<td>{item.qtd}</td>
										<td>R$ {item.valorUnitario}</td>
										<td>R$ {parseFloat(item.qtd*item.valorUnitario).toFixed(2)}</td>
									</tr>)
								})
								
							}
							<tr><td colspan='3'>Total do Pedido</td><td >R$ {(this.state.valorTotalPedido).toFixed(2)}</td></tr>
							<tr><td colspan='4'>						
								<Select   
									label='Status do pedido'
									cols='12'
									id='statusPedido' 
									onChange={this.preencheCampos} 
									options={[{value:'PENDENTE',label:'Pendente'},{value:'PAGO',label:'Pago'}]} 
								/>
							</td></tr>
						</table>
						<Grid cols='12'>

						</Grid>
						<Grid cols='12'>
						<button className='btn btn-primary btn-sm' onClick={this.finalizarVenda}>Finalizar Venda</button>
						</Grid>
					</Grid>
				</Row>
			</Page>
		)
	}
}

const mapStateToProps = state =>({cadastroProduto: state.cadastroProduto})
const mapDispatchToProps = dispatch => bindActionCreators({importarProdutos,gravarVenda},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(FormVendas)
