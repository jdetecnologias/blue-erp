import React from 'react'
import Grid from './grid'

let Input = (props) => (
	<Grid cols={props.cols}>
		<fieldset>
			<label className='col-12 text-center'>{props.label}</label>
			<input 
				type='text' 
				id={props.id} 
				label={props.label} 
				name={props.name} 
				placeholder={props.placeholder}  
				onChange={props.onChange} 
				className='form-control'
				value={props.valor}
				disabled={props.disabled?props.disabled:''}
			/>
		</fieldset>
	</Grid>
)

let Form = (props) => (
	<Grid cols={props.cols}>
		<form id='formTable' className='form-group row'>
			{props.children}
		</form>
	</Grid>
)


let Select = (props) =>{
const options = props.options ? props.options:[]
	return (
		<Grid cols={props.cols}>
			<fieldset>
				<label className='col-12 text-center'>{props.label}</label>
				<select className='form-control' onChange={props.onChange} id={props.id}>
				<option>Selecione</option>
					{options.map((option,key)=>(
						<option key={key} value={option.value} labelOpt={option.label}>{option.label}</option>
					))}
				</select>
			</fieldset>
		</Grid>
	)
}
export  {Input,Form, Select}