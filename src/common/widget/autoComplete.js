import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import If from  '../operator/if'
import Grid from '../layout/grid'

export default class AutoComplete extends React.Component{

	constructor(props){
		super(props)
		this.state = {sArrayList:[],showSuggestion: false,pControlText:'', text:'',clickedInside:false}
		this.filterArrayList = this.filterArrayList.bind(this)
		this.hideSuggestion = this.hideSuggestion.bind(this)
		this.setProduto = this.setProduto.bind(this)
		this.controlText = this.controlText.bind(this)
		this.lControlTxt = ''
		const $this = this
		document.body.onclick = (e)=>{
			const path = e.path

			let result = false
			Array.prototype.map.call(path,function(element){

				if(element.parentNode != null){
					if(element.classList.contains('autoComplete')){
						result = true
					}
				}
			})

			if(!result){
				$this.hideSuggestion()
			}
		}
	}

	hideSuggestion(){
		this.setState({...this.state, showSuggestion:false})
	}
	filterArrayList(e){
		const minLength = this.props.minLength || 1
		const aArrayList = this.props.pArrayList
		const text = e.target.value
		const aNewArr = aArrayList.filter(it=>{
			return it[this.props.field].toLowerCase().search(text.toLowerCase())> - 1
		})
		
		this.setState({...this.state, sArrayList:aNewArr, showSuggestion:text.length >= minLength,text: e.target.text})
	}
	
	controlText(){		
		if(this.lControlTxt !== this.props.text){
			this.lControlTxt = this.props.text
			return true
			//this.setState({...this.state, pControlText: this.props.text, text:this.props.text})
		}
	}
	setProduto(e){
		this.props.onClickItem(e)
		this.setState({...this.state,showSuggestion:false})
	}
	render(){
		return(
			<Grid cols={this.props.cols || '12'} className='autoComplete'>
				<label className='col-12 text-center'>{this.props.label}</label>
				<fieldset >
				<input type='text' value={this.controlText()?this.props.text:this.state.text}  onChange={(e)=>this.filterArrayList(e)} className='form-control'/>
				<If test={this.state.showSuggestion}>
					<ul onClick={this.setClickedInside}>
					{
						this.state.sArrayList.map((it)=>( 
							<li onClick={this.setProduto} value={it[this.props.fieldValue]}>{it[this.props.field]}</li>
							)
						)		
					}
					</ul>
				</If>
				</fieldset>
			</Grid>
		)
	}
}