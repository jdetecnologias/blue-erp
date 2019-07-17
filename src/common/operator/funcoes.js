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

function JoinArray(ATprincipal,AcampoToJoinPrincipal, AtSecundaria,AcampoToJoinSecundaria){
let arr = []
	ATprincipal.forEach(item=>{
		AtSecundaria.forEach(it=> {
			if(item[AcampoToJoinPrincipal] === it[AcampoToJoinSecundaria]){
				item.join = it
			}
		})
		arr.push(item)
	})
	return arr

}

export {inverterArray,optionProdutos,resetarCamposSelect, JoinArray}
