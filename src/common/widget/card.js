import React from 'react'
import Grid from '../layout/grid'


export default props => (
	<Grid cols={props.cols}>
	                        <div className="card col-12 no-padding">
								<img className='card-img-top' src={require('../../images/produto-mini-'+props.codigo+'.jpg')}/>
                                <div className="card-body">
                                  <h5 className="card-title">{props.nomeProduto}</h5>
                                  <p className="card-text">{props.text}</p>
                            
									<button className="btn btn-primary pull-right" onClick={props.btnOnclick}>Adicionar no carrinho</button>
								</div>
                        </div>

	</Grid>

)
