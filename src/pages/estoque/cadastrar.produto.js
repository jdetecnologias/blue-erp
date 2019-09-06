import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {Input,Form, Select} from '../../common/layout/form'
import Grid from '../../common/layout/grid'
import Page from '../../common/layout/page'
import Row from '../../common/layout/row'
import AutoComplete from '../../common/widget/autoComplete'
import {gravarProduto,importarProdutos} from './cadastrar.produto.action'
import {inverterArray,resetarCamposSelect} from '../../common/operator/funcoes'

class CadastroProduto extends React.Component{
	constructor(props){
		super(props)
		this.state = this.limparState()
		this.definirProduto = this.definirProduto.bind(this)
		this.validarForm = this.validarForm.bind(this)
		this.ResetarSelects = this.ResetarSelects.bind(this)
	}
	limparState(){
		return  {container:{value:'',label:''},subcontainer:{value:'',label:''},descricao:{value:'',label:''}, cor:{value:'',label:''},campos:[]}
	}
	definirProduto(e){
		const campo = e.target.getAttribute('tipo') || e.target.getAttribute('id') 
		let state = this.state
		let elemento = e.target
		switch(campo){
			case "categoria":
			 state.container.value = elemento.getAttribute('value')
			 state.container.label = elemento.textContent
			break
			case "subcategoria":
			 state.subcontainer.value = elemento.getAttribute('value')
			 state.subcontainer.label = elemento.textContent
			break
			case "descricao":
			 state.descricao.value = elemento.value
			 state.descricao.label = elemento.value
			break
			case "cor":
			 state.cor.value = elemento.getAttribute('value')
			 state.cor.label = elemento.textContent
			break		
		}
		state.campos.push(elemento)
		this.setState(state)
	}
	validarForm(){
		const estado = this.state;
		const containerValidate = estado.container.value !== '' && estado.container.label !== '' && estado.container.value  && estado.container.label
		const subcontainerValidate = estado.subcontainer.value !== '' && estado.subcontainer.label !== '' && estado.subcontainer.value  && estado.subcontainer.label
		const descValidate = estado.descricao.value !== '' && estado.descricao.label !== '' && estado.descricao.value && estado.descricao.label
		const corValidate = estado.cor.value !== '' && estado.cor.label !== '' && estado.cor.value  && estado.cor.label
		
		if(containerValidate && subcontainerValidate && descValidate && corValidate){
			let produtos = this.props.cadastro.produtos;
			const idProduto = (produtos.length + 1)
			const codigo = estado.container.value+estado.subcontainer.value+estado.cor.value+idProduto
			const descricaoCompleta = estado.container.label+' '+estado.subcontainer.label+' '+estado.descricao.value+' '+estado.cor.label
			const container = estado.container.value;
			const subcontainer = estado.subcontainer.value;
			const cor = estado.cor.value;
			const produto = {descricaoCompleta, codigo:codigo,container,subcontainer,desc:idProduto,cor}
			this.props.gravarProduto(produto)
			this.ResetarSelects()
			this.setState(this.limparState())

		}
		else {
			alert('Há campos que ainda não foram preenchidos, favor corrigir e tentar novamente!')
		}
	}
	ResetarSelects(){
		const campos = this.state.campos;
		
		resetarCamposSelect(campos)
	}
	componentDidMount(){
		
		this.props.importarProdutos()
		
	}
	render(){
		const qtdProd = this.props.cadastro.produtos.length
		const produtos = this.props.cadastro.produtos || []
		return (
			<Page cols='11' title='Cadastrar produto'>
			<Row>
				<Grid cols='12 10 8 6'>
					<h3 className='text-center'>Cadastrar Produto</h3>
					<Form cols='12'>
					
					<AutoComplete
					tipo='categoria'
					cols='12 6' 
					text={this.state.container.label} 
					label='Categoria' 
					onClickItem={this.definirProduto} 
					pArrayList={this.props.cadastro.containers} 
					field='label' 
					fieldValue='value' 
					minLength={1}/>
					
					<AutoComplete
					tipo='subcategoria'
					cols='12 6' 
					text={this.state.subcontainer.label} 
					label='Subcategoria' 
					onClickItem={this.definirProduto} 
					pArrayList={this.props.cadastro.subcontainers} 
					field='label' 
					fieldValue='value' 
					minLength={1}/>
					
					<Input 
						cols='12 6' 
						placeholder='Descrição produto' 
						label='Produto' 
						id='descricao' 
						onChange={this.definirProduto} 
						valor={this.state.descricao.value}
					/>
					<AutoComplete
					tipo='cor'
					cols='12 6' 
					text={this.state.cor.label} 
					label='Cor' 
					onClickItem={this.definirProduto} 
					pArrayList={this.props.cadastro.cores} 
					field='label' 
					fieldValue='value' 
					minLength={1}/>					

					<Grid cols='12'>
						<h4 className='text-center'>Código Produto</h4>
						<p>{this.state.container.value}
							{this.state.subcontainer.value}
							{this.state.cor.value}
							{this.state.cor.value == ''?'':qtdProd}
							
						</p>
						<p>
							{this.state.container.label} {this.state.subcontainer.label} {this.state.descricao.value} {this.state.cor.label}
						</p>
					</Grid>
				</Form>
				<button className='btn btn-primary btn-sm' onClick={this.validarForm}>Cadastrar</button>
				</Grid>
				<Grid cols='12 10 8 6'>
					<h2 className='text-center'>Produtos</h2>
					<table  className='table'>
						<thead>
							<tr>
								<th>Código</th>
								<th>Descrição</th>
							</tr>
						</thead>
						<tbody>
						{
							produtos.map((produto,key)=>(
								<tr key={key} indice={key}>
									<td>{produto.codigo}</td>
									<td>{produto.descricaoCompleta}</td>
								</tr>
							)
							
)
						}
						</tbody>
						
					</table>
				</Grid>
			</Row>
			</Page>
		
		)
	}
}

const mapStateToProps = state => ({cadastro: state.cadastroProduto})
const  mapDispatchToProps = dispatch => bindActionCreators({gravarProduto,importarProdutos},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(CadastroProduto)

/*					<Select 
						cols='12 6' 
						options={this.props.cadastro.containers} 
						id='categoria' label='Categoria' 
						onChange={this.definirProduto}
					/>
					<Select cols='12 6' 
						options={this.props.cadastro.subcontainers} 
						id='subcategoria' 
						label='SubCategoria' 
						onChange={this.definirProduto}
					/>
					<Select cols='12 6' options={this.props.cadastro.cores} label='Cor' id='cor'onChange={this.definirProduto}/>					
					*/