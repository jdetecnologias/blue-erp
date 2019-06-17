import {combineReducers} from 'redux'
import ProducaoReducer from '../pages/producao/producao.reducer'
import CadastroProduto from '../pages/estoque/cadastrar.produto.reducer'
const rootReducers = combineReducers({
	insumos: [{insumo: 'Malha Algodão fio 24',qtd:10, unidade:'KG'}],
	producao: ProducaoReducer,
	cadastroProduto: CadastroProduto
})

export default rootReducers;