class ListaNegociacoes{

	constructor(){
		this._negociacoes = [];
	}

	adiciona(negociacao){
		
		this._negociacoes = [].concat(this._negociacoes, negociacao);
		//this._negociacoes.push(negociacao);
	}


	get negociacoes() {
		/*Técnica de programação defensiva onde eu devolvo
		uma cópia de minha lista de negociações para que a 
		instância original seja blindada e não sofra nenhuma
		alteração*/
    	return [].concat(this._negociacoes);
	}

	esvazia(){
		
		this._negociacoes = [];	
	}

	get volumeTotal(){

		return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
	}

	ordena(criterio){
		this._negociacoes.sort(criterio);
	}

	inverteOrdem(){
		this._negociacoes.reverse();
	}
}