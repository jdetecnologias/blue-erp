import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {importarProdutos} from '../estoque/cadastrar.produto.action'

import Grid from '../../common/layout/grid'
import Page from '../../common/layout/page'
import Row from '../../common/layout/row'
import {Input, Form,Select} from '../../common/layout/form'
import {optionProdutos,resetarCamposSelect} from '../../common/operator/funcoes'

const INITIAL_ITEM = ()=>({produto:'',descProduto:'', qtd:'',valorUnitario:''})

class FormVendas extends React.Component{
	constructor(props){
		super(props)
		this.state = {nomeCliente:'',item:INITIAL_ITEM(),itens:[],selectCampos:[],valorTotalPedido: 0}
		this.preencheCampos = this.preencheCampos.bind(this)
		this.adicionarItem = this.adicionarItem.bind(this)
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
				item.qtd = e.target.value
			break;
			case 'vlunitario':
				item.valorUnitario = e.target.value
			break;
			case 'produto':
				item.produto = e.target.value
				const textoProduto = e.target.options[e.target.selectedIndex].text
				campos.push(e.target)
				state.campos = campos
				item.descProduto =textoProduto
			break;
		
		}
		state.item =item
		this.setState({...this.state,item: state.item})
			console.log(state)
	}
	componentDidMount(){
		this.props.importarProdutos()
	}
	adicionarItem (){
		let state = this.state

		let itens = state.itens
		itens.push(state.item)
		state.itens = itens
		let valorTotalPedido = state.valorTotalPedido
		console.log(state.item.qtd*state.item.valorUnitario)
		valorTotalPedido += parseFloat(state.item.qtd)*parseFloat(state.item.valorUnitario)
		state.item = INITIAL_ITEM()
		state.valorTotalPedido = valorTotalPedido
		this.setState( state)
		resetarCamposSelect(this.state.campos)
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
						<h3 className='text-center'>Dados do pedido</h3>
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
						</table>
					</Grid>
				</Row>
			</Page>
		)
	}
}

const mapStateToProps = state =>({cadastroProduto: state.cadastroProduto})
const mapDispatchToProps = dispatch => bindActionCreators({importarProdutos},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(FormVendas)
