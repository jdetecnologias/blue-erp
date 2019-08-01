import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {importarFinanceiro} from './financeiro.container.action'
import {JoinArray,ConvertDate} from '../../common/operator/funcoes'
import Grid from '../../common/layout/grid'
import Page from '../../common/layout/page'
import Row from '../../common/layout/row'
import If from '../../common/operator/if'
const bgPattern = 'bg-info text-white'

class Financeiro extends React.Component{
	constructor(props){
		super(props)
		this.montarTabela = this.montarTabela.bind(this)
		this.retornarValoresTotais = this.retornarValoresTotais.bind(this)
	}
	componentDidMount(){
		this.props.importarFinanceiro()
		
	}
	retornarValoresTotais(){
		const status = {}
		const finan = this.props.financeiro.financeiro
		finan.map(fi=>{
			fi.valorTotalPedido = +fi.valorTotalPedido
			status[fi.status]?status[fi.status] += fi.valorTotalPedido: status[fi.status] = fi.valorTotalPedido
		})
		return status
		
	}
	montarTabela(){
		const finan = this.props.financeiro.financeiro
		
		finan.map((fi)=>{

			return <tr><td>{fi._id}</td><td>{fi.valorTotalPedido}</td><td>{fi.status}</td></tr>
		})
		
	}
	render(){
		const Vstatus = this.retornarValoresTotais()
		const finan = this.props.financeiro.financeiro
		return(
			<Page cols='11' title='Relatório Financeiro'>
				
				<Grid cols='12'>
					<Row>
						<Grid cols='6'>
							<table className='table'>
								<thead><tr><th>Dt. Criação</th><th>Documento</th><th>Valor Total</th><th>Status</th></tr></thead>
								<tbody>
									{
										finan.map((fi)=>{

											return <tr><td>{ConvertDate(fi.createdAt)}</td><td>{fi._id}</td><td>{fi.valorTotalPedido}</td><td>{fi.status}</td></tr>
										})										
										
									}
								</tbody>
							</table>
						</Grid>
						<Grid cols='6'>
							<table className='table'>
								<thead><tr><th>Status</th><th>Valor Total</th></tr></thead>
								<tbody>
									{
										Object.keys(Vstatus).map(chave=>{
											return <tr><td>{chave}</td><td>{Vstatus[chave]}</td></tr>
											
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
const mapStateToProps = state=> ({financeiro: state.financeiro})
const mapDispatchToProps = dispatch=> bindActionCreators({importarFinanceiro},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Financeiro)