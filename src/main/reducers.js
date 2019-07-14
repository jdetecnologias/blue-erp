import {combineReducers} from 'redux'
import ProducaoReducer from '../pages/producao/producao.reducer'
import CadastroProduto from '../pages/estoque/cadastrar.produto.reducer'
import Estoque from '../pages/estoque/estoque.container.reducer'

const rootReducers = combineReducers({
	insumos: [{insumo: 'Malha Algodão fio 24',qtd:10, unidade:'KG'}],
	producao: ProducaoReducer,
	cadastroProduto: CadastroProduto,
	estoque: Estoque
})

export default rootReducers;