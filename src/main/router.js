import React from 'react'
import Estoque from '../pages/estoque/estoque.container'
import Produto from '../pages/estoque/cadastrar.produto'
import Entrada from '../pages/estoque/entrada.estoque'
import Vendas from '../pages/vendas/vendas.container'
import ConsultarVenda from '../pages/vendas/consultar.vendas'
import Producao from '../pages/producao/producao.container'
import Insumo from '../pages/producao/producao.insumo.js'
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import {BrowserHistory} from 'react-router'
import createHistory from 'history/createBrowserHistory';

const history = createHistory({ basename: '/something' });
export default props=>(

        <Router history={history} basename='something'>
			<Route path="/insumo" component={Insumo} />
			<Route path="/producao" component={Producao} />
			<Route path="/estoque"  component={Estoque} />
			<Route path="/produto"  component={Produto} />
			<Route path="/entrada"  component={Entrada} />
			<Route path="/venda"    component={Vendas} />
			<Route path="/cvenda"    component={ConsultarVenda} />
        </Router>
	)