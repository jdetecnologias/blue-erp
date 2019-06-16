import React from 'react'
import Grid from './grid'

let Input = (props) => (
	<Grid cols={props.cols}>
		<fieldset>
			<label className='col-12 text-center'>{props.label}</label>
			<input type='text' name={props.name} placeholder={props.placeholder} className='form-control'/>
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
			<select className='form-control'>
				{props.options.map(option=>(
					<option value={option.value}>{option.label}</option>
				))}
			</select>
		</fieldset>
	</Grid>
)
export  {Input,Form, Select}