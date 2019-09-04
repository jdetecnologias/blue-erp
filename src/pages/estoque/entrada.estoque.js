import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {importarProdutos } from './cadastrar.produto.action'
import {gravarEstoque,setStatusResp} from './entrada.estoque.action'

import {optionProdutos, resetarCamposSelect} from '../../common/operator/funcoes'
import {Input, Form, Select} from '../../common/layout/form'
import Grid from '../../common/layout/grid'
import Page from '../../common/layout/page'
import If from '../../common/operator/if'
import InputProdutos from '../../common/widget/autoComplete'
		
const INITIAL_STATE = function(){
	return {qtdTotal:0,codigo:'',campos:[],descricaoCompleta:''}
}
class EntradaEstoque extends React.Component{
	constructor(props){
		super(props)
		this.state = INITIAL_STATE()
		this.atribuirProduto = this.atribuirProduto.bind(this)
		this.atribuirqtd = this.atribuirqtd.bind(this)
		this.finalizarEntrada = this.finalizarEntrada.bind(this)
		this.retirarMensagemTopo = this.retirarMensagemTopo.bind(this) 
	}

	componentDidMount(){
		this.props.importarProdutos()
	}
	atribuirProduto(e){
		this.retirarMensagemTopo()
		let campos = this.state.campos
		const codigo = e.target.getAttribute('value')
		const descricaoCompleta = e.target.textContent
		this.setState({...this.state, codigo,descricaoCompleta})
	}
	atribuirqtd(e){
		this.retirarMensagemTopo()
		this.setState({...this.state, qtdTotal: +e.target.value})
	}
	finalizarEntrada(){
		console.log("state",this.state)
		this.props.gravarEstoque({qtdTotal:this.state.qtdTotal,codigo:this.state.codigo})
		this.setState(INITIAL_STATE())

		
	}
	retirarMensagemTopo(){
		this.props.setStatusResp()
	}
	render(){
		return (
			<Page cols='11' title='Entrada mercadoria no estoque'> 
				<If test={this.props.statusResp.status == 200}>
					<div className="alert alert-warning alert-dismissible fade show" role="alert">
						<strong>Estoque Atualizado com sucesso</strong> 
						<button type="button" onClick={this.retirarMensagemTopo} className="close" data-dismiss="alert" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
				</If>
				<If test={this.props.statusResp.status == 404}>
					<div className="alert alert-danger alert-dismissible fade show" role="alert">
						<strong>Erro ao atualizar estoque</strong> 
						<button type="button" onClick={this.retirarMensagemTopo} className="close" data-dismiss="alert" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
				</If>
					<Grid cols='12 10 8 6 4' className='offset-sm-1 offset-md-2 offset-lg-3 offset-xl-4'>
						<Form cols='12'>
						<InputProdutos text={this.state.descricaoCompleta} label='Produto' onClickItem={this.atribuirProduto} pArrayList={this.props.cadastro.produtos} field='descricaoCompleta' fieldValue='_id' minLength={2}/>
						<Grid cols='12' className='bg-primary text-white my-3 text-center'>
							<h5>Produto Selectionado</h5>
							<p>{this.state.descricaoCompleta===''? 'Nenhum': this.state.descricaoCompleta}</p>
						</Grid>
						<Input cols='6 4' valor={this.state.qtdTotal} placeholder='Qtd.'    label='Qtd' onChange={this.atribuirqtd}/>
					</Form>
					<button className='btn btn-primary btn-sm' onClick={this.finalizarEntrada}>Registrar mercadoria</button>
					</Grid>
			</Page>
		
		)
	}
}

const mapStateToProps = state =>({cadastro: state.cadastroProduto, statusResp: state.estoque.status})
const mapDispatchToProps = dispatch => bindActionCreators({importarProdutos, gravarEstoque,setStatusResp},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(EntradaEstoque)