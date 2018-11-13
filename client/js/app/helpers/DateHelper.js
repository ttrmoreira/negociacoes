class DateHelper{

	constructor(){
		throw new Error('Esta classe não pode ser instanciada');
	}

	static dataParaTexto(data){
		
		//Recurso de template String
		return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
	}

	static textoParaData(texto){

		/*A função Spread Operator "..." permite que os elementos de 
		um array, sejam trasnformados em parâmetros no construtor
		nesse caso de new Date os valores que esão entre '-' que já foram
		transformados em array serão transformados em parâmetros ano, mês e dia*/
		console.log(texto);
		if(!/\d{2}\/\d{2}\/\d{4}/.test(texto)) 
			throw new Error('Deve estar no formato dd/mm/aaaa');
		
		return new Date(...texto
					.split('\/')
					/*Para o mês a contagem é a partir de 0, 
					por isso subtrai-se o mod 2 do segundo parâmetro*/
					.reverse()
					.map((item, indice) =>  item - indice % 2));
	}
}