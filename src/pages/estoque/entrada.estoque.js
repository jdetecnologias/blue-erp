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
		
const INITIAL_STATE = function(){
	return {qtdTotal:0,codigo:'',campos:[]}
}
class EntradaEstoque extends React.Component{
	constructor(props){
		super(props)
		this.state = INITIAL_STATE()
		this.atribuirCodigoProduto = this.atribuirCodigoProduto.bind(this)
		this.atribuirqtd = this.atribuirqtd.bind(this)
		this.finalizarEntrada = this.finalizarEntrada.bind(this)
		this.retirarMensagemTopo = this.retirarMensagemTopo.bind(this) 
	}

	componentDidMount(){
		this.props.importarProdutos()
	}
	atribuirCodigoProduto(e){
		this.retirarMensagemTopo()
		let campos = this.state.campos
		campos.push(e.target)
		this.setState({...this.state, codigo: e.target.value,campos})
	}
	atribuirqtd(e){
		this.retirarMensagemTopo()
		this.setState({...this.state, qtdTotal: e.target.value})
	}
	finalizarEntrada(){
		this.props.gravarEstoque({qtdTotal:this.state.qtdTotal,codigo:this.state.codigo})
		resetarCamposSelect(this.state.campos)
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
						<Select cols='12'  label='Produto' options={optionProdutos(this.props.cadastro.produtos)} onChange={this.atribuirCodigoProduto}/>
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