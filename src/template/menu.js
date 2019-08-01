import React from 'react'

export default props => (
	<aside className='main-sidebar bg-secundario text-white col-1 d-none d-lg-block'>
		<ul>
			<li><a href='/insumo'>Insumo</a></li>
			<li><a href='/producao'>Produção</a></li>
			<li><a href='/estoque'>Estoque</a></li>	
			<li><a href='/produto'>Produto</a></li>	
			<li><a href='/entrada'>Entrada</a></li>	
			<li><a href='/venda'>Venda</a></li>
			<li><a href='/cvenda'>Consultar Venda</a></li>
			<li><a href='/financeiro'>Financeiro</a></li>
		</ul>
	</aside>
)