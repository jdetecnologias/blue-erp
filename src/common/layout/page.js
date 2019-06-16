import React from 'react'
import Grid from './grid'
export default props => (
		<Grid cols={props.cols}>
			<h2>{props.title}</h2>
				{props.children}
		</Grid>
)