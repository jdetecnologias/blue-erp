import React from 'react'
//import '../common/template/login.css'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Logar,RecuperarEmail,TipEmail} from './login.action'



class Login extends React.Component{
	constructor(props){
		super(props)
		this.state = {login:"",senha: "",visible:false,email:""}
		this.changeState = this.changeState.bind(this)
		this.setVisible = this.setVisible.bind(this)
	}

	changeState(e){
		let state = this.state;
		let namePropriety = e.target.getAttribute('name');
		state[namePropriety] = e.target.value;
		this.setState({...this.state, state})
	}
	setVisible(){
		let visible = this.state.visible
		visible= !visible
		this.setState({...this.state, visible})
	}
	componentWillMount(){
		this.props.Logar()
	}
	render(){
			return (
			<div id='login' className='container-fluid' style={{minHeight:'100vh'}}>
				<div className="d-flex justify-content-center h-100">
					<div  className="cardt card col-xs-6"  style={{display:this.state.visible?'none':'block'}}>
						<div className="cardt-header card-header">
							<h3 className='text-center' >Entrar</h3>
			
						</div>
						<div className="card-body">
								<div className="input-group form-group">
									<div className="input-group-prepend">
										<span className="input-group-text"><i className="fa fa-user"></i></span>
									</div>
									<input type="text" className="form-control" name='login' onChange={this.changeState} value={this.state.login} placeholder="Usuário"/>
								</div>
								<div className="input-group form-group">
									<div className="input-group-prepend">
										<span className="input-group-text"><i className="fa fa-key"></i></span>
									</div>
									<input type="password" className="form-control" name='senha' onChange={this.changeState} value={this.state.senha} placeholder="Senha"/>
								</div>
								<div className="form-group">
									<input type="submit" value="Login" onClick={()=>this.props.Logar(this.state.login,this.state.senha)} className="btn form-control login_btn" />
								</div>
						</div>
						<div className="card-footer text-white">
							<button type='button' className='btn btn-danger btn-sm no-padding'  onClick={this.setVisible} data-toggle="modal" data-target="#myModal">
								Esqueci a senha
							</button>
						</div>
					</div>
					<div  className="cardt card col-xs-6" style={{display:this.state.visible?'block':'none'}}>
						<div className="cardt-header card-header">
							<h3 className='text-center'  >Recuperar Senha</h3>
			
						</div>
						<div className="card-body">
								<div className="input-group form-group">
									<div className="input-group-prepend">
										<span className="input-group-text"><i className="fa fa-at"></i></span>
									</div>
									<input type="text" className="form-control" name='email' onChange={this.props.TipEmail} value={this.props.email} placeholder="E-mail de recuperação"/>
								</div>
								<div className="form-group">
									<input type="submit" value="Enviar" onClick={()=>this.props.RecuperarEmail(this.props.email)} className="btn form-control login_btn" />
								</div>
						</div>
						<div className="card-footer text-white">
							<button type='button' onClick={this.setVisible} className='btn btn-success btn-sm no-padding' data-toggle="modal" data-target="#myModal">
								Voltar
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({auth: state.auth.auth,email:state.auth.email})
const mapDispatchToProps = dispatch => bindActionCreators({Logar,RecuperarEmail,TipEmail},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Login)
