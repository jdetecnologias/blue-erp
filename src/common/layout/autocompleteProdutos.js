import React, {Component} from 'react';
import {AutoComplete} from 'primereact/autocomplete';
import {connect} from 'react-redux' 
import{bindActionCreators} from 'redux'
import {importarProdutos} from '../../pages/estoque/cadastrar.produto.action'

class AutoCompleteProdutos extends Component {

    constructor() {
        super();
        this.state = { 
            filteredProdutos: null,
		selectedItem: null
        };
        
        this.filterProdutos = this.filterProdutos.bind(this);

    }

    componentWillMount() {
		this.props.importarProdutos()
    }

    filterProdutos(event) {
		const produtos = this.props.produtos

        setTimeout(() => {
            let results;

            if (event.query.length === 0) {
                results = [...produtos];
            }
            else {
                results = produtos.filter((produto) => {
                    return produto.descricaoCompleta.toLowerCase().search(event.query.toLowerCase()) > -1;
                });
            }
		console.log(results)
            this.setState({ filteredProdutos: results });
        }, 250);
    }


    itemTemplate(produto) {
        return (
            <div className="p-clearfix">
                <div >{produto.descricaoCompleta}</div>
            </div>
        );
    }

    render() {
        return (

                <div className="col-12">
			<fieldset>
			<label className='col-12 text-center'>{this.props.label}</label>
                    <AutoComplete value={this.state.produto} inputClassName='form form-control' suggestions={this.state.filteredProdutos} completeMethod={this.filterProdutos} size={30} minLength={1}
                        placeholder="Digite a descrição do produto" dropdown={false} field='descricaoCompleta' itemTemplate={this.itemTemplate.bind(this)} onChange={(e) => this.setState({produto: e.value})} />
					
			</fieldset>
		</div>

        )
    }
}

const mapStateToProps = state => ({produtos: state.cadastroProduto.produtos})
const mapDispatchToProps = dispatch => bindActionCreators({importarProdutos},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(AutoCompleteProdutos)