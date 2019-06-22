export  function gravarProduto(produtos){
	return 	{
			type:'SAVE_PRODUCT',
			payload: produtos
			}
}