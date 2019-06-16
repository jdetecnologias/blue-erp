import React from 'react'


export default class Grid extends React.Component{
	toCssClasses(numbers){
		
		const cols = numbers ? numbers.split(' '):[]
		let classes = this.props.className ? this.props.className+' ': ''
		
		if(cols[0]) classes+=`col-${cols[0]}`
		if(cols[1]) classes+=` col-sm-${cols[1]}`
		if(cols[2]) classes+=` col-md-${cols[2]}`
		if(cols[3]) classes+=` col-lg-${cols[3]}`
		if(cols[4]) classes+=` col-xl-${cols[4]}`
		
		return classes
	}
	render(){
		const GridClasses = this.toCssClasses(this.props.cols || 12)
		return (
			<div className={GridClasses}>
				{this.props.children}
			</div>
		)
		
	}
}