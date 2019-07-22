import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {importarProdutos} from '../estoque/cadastrar.produto.action'

import{gravarVenda} from './vendas.action'
import Grid from '../../common/layout/grid'
import Page from '../../common/layout/page'
import Row from '../../common/layout/row'
import If from '../../common/operator/if'
import {Input, Form,Select} from '../../common/layout/form'
import {optionProdutos,resetarCamposSelect} from '../../common/operator/funcoes'

const INITIAL_ITEM = ()=>({produto:'',descProduto:'', qtd:'',valorUnitario:''})
const INITIAL_STATE = ()=>({nomeCliente:'',indice:'',item:INITIAL_ITEM(),itens:[],selectCampos:[],valorTotalPedido: 0,status:'PENDENTE'})

class FormVendas extends React.Component{
	constructor(props){
		super(props)
		this.state = INITIAL_STATE()
		this.preencheCampos = this.preencheCampos.bind(this)
		this.adicionarItem = this.adicionarItem.bind(this)
		this.finalizarVenda = this.finalizarVenda.bind(this)
		this.excluirItem = this.excluirItem.bind(this)
		this.somarValorTotal = this.somarValorTotal.bind(this)
		this.editarItem = this.editarItem.bind(this)
		this.atualizarItem = this.atualizarItem.bind(this)
	}
	validarItem(objeto){
		if(objeto.produto =='' || objeto.descProduto == '' || objeto.qtd == '' || objeto.valorUnitario == ''){
				alert('Há campos vazios no formulário de venda, favor verificar')
			return false;
		}
		else {
			return true
		}
	}
	validarItens(state){
		if(state.nomeCliente == '' || state.status == '' || state.itens.length <=0){
			alert('Há informações faltantes no formulário de venda, favor verificar')
			return false
		}
		else{
			state.itens.map(item=>{
				if(!this.validarItem(item)){
					return false;
				}
			})
			return true
		}
	}
	somarValorTotal(){
		const itens = this.state.itens
		let valor = 0
		itens.map(item=>{
			valor += (item.valorUnitario * item.qtd)
		})
		return valor
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
	componentWillMounr(){
		this.somarValorTotal()
	}
	
	adicionarItem (){
		
		let state = this.state
		if(this.validarItem(state.item)){
		const objetoItem = {
							produto:state.item.produto
							,descProduto:state.item.descProduto
							, qtd:parseFloat(state.item.qtd)
							,valorUnitario:parseFloat(state.item.valorUnitario)
						}
		let itens = state.itens
		itens.push(objetoItem)
		state.itens = itens
		
		const valorTotalPedido = this.somarValorTotal()
		state.item = INITIAL_ITEM()
		state.valorTotalPedido = valorTotalPedido
		this.setState( state)
		resetarCamposSelect(this.state.campos)
		}
	}
	finalizarVenda(){
		const state = this.state;
		if(this.validarItens(state)){
		let venda =  {nomeCliente:state.nomeCliente,itens:state.itens,valorTotalPedido:state.valorTotalPedido,status:state.status}
		gravarVenda(venda)
		this.setState(INITIAL_STATE())
		}else{
			
		}
	}
	excluirItem(indice){
		const resposta = window.confirm('Você deseja realmente excluir esse item?')
		if(resposta){
			let state = this.state
			let itens = state.itens
			itens.splice(indice,1)
			const valorTotalPedido = this.somarValorTotal()
			this.setState({...this.state, itens, valorTotalPedido})
		}
	}
	
	editarItem(indice){
		const state = this.state
		const item = this.state.itens[indice]
		this.setState({...state, item,indice})
	}
	
	atualizarItem(){
		const state = this.state
		let itens = state.itens
		
		itens[state.indice] = state.item
		this.setState({...this.state, item:INITIAL_ITEM(),itens, indice:''})
		
		
		
	}
	render(){
		return(
			<Page cols='11' title='Vendas'>
				<Row>
					<Grid cols='12 4'>
						<Form cols='12'>
							<Input cols='12'  id='nomeCliente' placeholder='Cliente' valor={this.state.nomeCliente} onChange={this.preencheCampos}/>
							<Select cols='12'  id='produto' label='Produto'  valor={this.state.item.produto} onChange={this.preencheCampos} options={optionProdutos(this.props.cadastroProduto.produtos)} />
							<Input cols='12 2'  placeholder='Qtd'  valor={this.state.item.qtd} id='qtd'  onChange={this.preencheCampos}/>
							<Input cols='12 5'  placeholder='Valor unitário' valor={this.state.item.valorUnitario} id='vlunitario' onChange={this.preencheCampos}/>
							<Input cols='12 5'  placeholder='Total' valor={parseFloat(this.state.item.valorUnitario*this.state.item.qtd).toFixed(2)} id='vlTotal'/>
						</Form>
						<If test={this.state.indice === ''}>
							<button className='btn btn-primary btn-sm' onClick={this.adicionarItem}>Adicionar Item</button>
						</If>
						<If test={this.state.indice !== ''}>
							<button className='btn btn-primary btn-sm' onClick={this.atualizarItem}>Atualizar Item</button>
						</If>
					</Grid>
					<Grid cols='12 8'>
						<h3 className='text-center'>Dados do pedido </h3>

						<table className='table'>
							<tr><td>Nome do cliente:</td><td colspan='3'>{this.state.nomeCliente}</td> </tr>
							<tr><td colspan='4' className='text-center'>Itens</td> </tr>
							<tr><td>Produto</td><td>Qtd</td><td>V. unit</td><td>Total</td><td>Editar</td><td>Excluir</td></tr>
							{
								this.state.itens.map((item,key)=>{
									return(<tr>
										<td>{item.descProduto}</td>
										<td>{item.qtd}</td>
										<td>R$ {item.valorUnitario}</td>
										<td>R$ {parseFloat(item.qtd*item.valorUnitario).toFixed(2)}</td>
										<td className='text-center'><i onClick={()=> this.editarItem(key)} className="fa fa-edit"></i></td>
										<td className='text-center'><i onClick={()=> this.excluirItem(key)} className="fa fa-trash"></i></td>
									</tr>)
								})
								
							}
							<tr><td colspan='4'>Total do Pedido</td><td colspan='2'>R$ {(this.state.valorTotalPedido).toFixed(2)}</td></tr>
							<tr><td colspan='6'>						
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
