function inverterArray(array){
	console.log(array)
	const init = array.length - 1;
	let arr = []
	for(let i = init; i >=0;i--){
		arr.push(array[i])
		
	}
	
	return arr
	
}

function  optionProdutos(array){
	let arr = []
	
	array.map(item=>{
		arr.push({value:item._id, label:item.descricaoCompleta})
	})
	return arr
}

function resetarCamposSelect(campos){
	campos.map(campo=>{
		campo.selectedIndex = 0
	})
}
export {inverterArray,optionProdutos,resetarCamposSelect}
