import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {Input,Form, Select} from '../../common/layout/form'
import Grid from '../../common/layout/grid'
import Page from '../../common/layout/page'

class CadastroProduto extends React.Component{
	constructor(props){
		super(props)
		this.state = {container:{value:'',label:''},subcontainer:{value:'',label:''},descricao:{value:'',label:''}, cor:{value:'',label:''}}
		this.definirProduto = this.definirProduto.bind(this)
	}
	
	definirProduto(e){
		const campo = e.target.getAttribute('id')
		let state = this.state
		let elemento = e.target
		switch(campo){
			case "categoria":
			 state.container.value = elemento.value
			 state.container.label = elemento.options[elemento.selectedIndex].getAttribute('labelOpt')	
			break
			case "subcategoria":
			 state.subcontainer.value = elemento.value
			 state.subcontainer.label = elemento.options[elemento.selectedIndex].getAttribute('labelOpt')
			break
			case "descricao":
			 state.descricao.value = elemento.value
			 state.descricao.label = elemento.value
			break
			case "cor":
			 state.cor.value = elemento.value
			 state.cor.label = elemento.options[elemento.selectedIndex].getAttribute('labelOpt')
			break					
		}
		this.setState(state)
	}
	render(){
		return (
			<Page cols='11' title='Cadastrar produto'>
				<Grid cols='12 10 8 6 4' className='offset-sm-1 offset-md-2 offset-lg-3 offset-xl-4'>
					<h3 className='text-center'>Cadastrar Produto</h3>
					<Form cols='12'>
					<Select cols='12 6' options={this.props.cadastro.containers} id='categoria' label='Categoria' onChange={this.definirProduto}/>
					<Select cols='12 6' options={this.props.cadastro.subcontainers} id='subcategoria' label='SubCategoria' onChange={this.definirProduto}/>
					<Input cols='12 6' placeholder='Descrição produto' label='Produto' id='descricao' onChange={this.definirProduto}/>
					<Select cols='12 6' options={this.props.cadastro.cores} label='Cor' id='cor'onChange={this.definirProduto}/>
					<Grid cols='12'>
						<h4 className='text-center'>Código Produto</h4>
						<p>{this.state.container.value}
							{this.state.subcontainer.value}
							{this.state.cor.value} 
						</p>
						<p>
							{this.state.container.label} {this.state.subcontainer.label} {this.state.descricao.value} {this.state.cor.label}
						</p>
					</Grid>
				</Form>
				<button className='btn btn-primary btn-sm'>Cadastrar</button>
				</Grid>
			</Page>
		
		)
	}
}

const mapStateToProps = state => ({cadastro: state.cadastroProduto})
export default connect(mapStateToProps)(CadastroProduto)