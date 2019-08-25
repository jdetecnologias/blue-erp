import React from 'react'
import If from '../common/operator/if'

class LI extends React.Component{
	constructor(props){
		super(props)
	}
	
	render(){
		return (
				<li><a href={this.props.href}>{this.props.label}</a></li>
		)
	}
}

class UL extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<If test={this.props.active}>
				<ul>
					{this.props.children}
				</ul>
			</If>
		)
	}
}

export {LI, UL}