import React from 'react'
import {bindActionCreator} from 'redux'
import {connect } from 'react-redux'
import If from '../operator/if'

class TabContent extends React.Component{
	render(){
		const selected = this.props.tab.selected === this.props.id
		const visible = this.props.tab.visibles[this.props.id]
		return (	
		<If test={visible}>
			<div id={this.props.id} className={`tab-pane ${selected? 'active': ''}`}>
				{this.props.children}
			</div>	
		</If>
	)
	}
}

const mapStateToprops = state => ({tab: state.tab })
export default connect(mapStateToprops)(TabContent)