class Negociacao {

	constructor (data, quantidade, valor){

		this._data = new Date(data.getTime());
		this._quantidade = quantidade;
		this._valor = valor;
		this._volume = valor * quantidade;

		Object.freeze(this);

	}


	get data(){
		return this._data;
	}

	get quantidade(){
		return this._quantidade;
	}

	get valor(){
		return this._valor;
	}

	get volume(){
		return this._volume;
	}

	isEquals(outraNegociacao){
		return JSON.stringify(this) == JSON.stringify(outraNegociacao);
	}

}

