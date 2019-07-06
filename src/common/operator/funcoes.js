function inverterArray(array){
	console.log(array)
	const init = array.length - 1;
	let arr = []
	for(let i = init; i >=0;i--){
		arr.push(array[i])
		
	}
	
	return arr
	
}

export {inverterArray}