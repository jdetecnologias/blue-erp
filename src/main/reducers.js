import {combineReducers} from 'redux'
import ProducaoReducer from '../pages/producao/producao.reducer'
import CadastroProduto from '../pages/estoque/cadastrar.produto.reducer'
import Vendas from '../pages/vendas/vendas.container.reducer'
import Estoque from '../pages/estoque/estoque.container.reducer'
import Financeiro from '../pages/financeiro/financeiro.container.reducer'
import Menu from '../template/menu.reducer'
import Auth from '../pages/login/login.reducer'

const rootReducers = combineReducers({
	insumos: [{insumo: 'Malha Algodão fio 24',qtd:10, unidade:'KG'}],
	producao: ProducaoReducer,
	cadastroProduto: CadastroProduto,
	estoque: Estoque,
	vendas: Vendas,
	financeiro: Financeiro,
	auth: Auth,
	menu: Menu
})

export default rootReducers;