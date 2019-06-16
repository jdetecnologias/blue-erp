import React from 'react'

export default props=>(
	<li>
		<a href={props.path} onClick={props.btnOnclick}>
			<i className={`fa fa-${props.icon}`}></i><span>{props.label}</span>
				{props.children}
		</a>
	</li>
)