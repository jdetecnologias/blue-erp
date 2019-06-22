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


let Select = (props) => (
	<Grid cols={props.cols}>
		<fieldset>
			<label className='col-12 text-center'>{props.label}</label>
			<select className='form-control' onChange={props.onChange} id={props.id}>
			<option>Selecione</option>
				{props.options.map(option=>(
					<option value={option.value} labelOpt={option.label}>{option.label}</option>
				))}
			</select>
		</fieldset>
	</Grid>
)
export  {Input,Form, Select}