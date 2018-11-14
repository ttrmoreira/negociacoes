class NegociacaoController {

	constructor(){

		/*Estratégia muito utilizada para criar frameworks
		Como querySelector é um método que usa THIS ela não pode perder a referência de document.
		Por isso, deve-se usar o método bind para manter a variável $ vinculada ao objeto document*/
		let $ = document.querySelector.bind(document);

		/*Com essa estratégia, $ passa a ser o mesmo que document.querySelector sem perder a referência
		ao document*/ 
		this._inputData = $("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputValor = $("#valor"); 
		this._ordemAtual = '';


		/*O contexto de uma arrow function é léxico, ou seja, ele se mantêm o mesmo até o fim, por
		isso não será necessário usar a função Reflect.apply do ES6 em ListaNegociacoes.js, pois o this
		da function, se manterá como uma instancia de NegociacaoController.js*/
		
		//this._listaNegociacoes = new ListaNegociacoes(model => this._negociacoesView.update(model));

		//Para não sujar o modelo MVC e manter o controller e a view intocada pelo model usei o padrão proxy 

		this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), 'adiciona', 'apaga', 'ordena', 'inverteOrdem');


		this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), 'texto');

		ConnectionFactory
			.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.listaTodos())
			.then(negociacoes => 
				negociacoes.forEach(negociacao => 
					this._listaNegociacoes.adiciona(negociacao)))
			.catch(erro => {
				console.log(erro);
				reject('Não foi possível listar as negociações.');
			});
	}


	adiciona(event){
		
		event.preventDefault();

		ConnectionFactory
			.getConnection()
			.then(connection => {
				
				let negociacao = this._criarNegociacao();
				new NegociacaoDao(connection)
					.adiciona(negociacao)
					.then(()=>{
						
						this._listaNegociacoes.adiciona(negociacao);
						this._limpaFormulario();
						this._mensagem.texto = 'Negociacao adicionada com sucesso';
					})
			}).catch(erro => this._mensagem.texto = erro);
	
	}



	importaNegociacoes(){
		console.log('Entrei na função importaNegociacoes');
		
		let negociacaoService = new NegociacaoService();

		negociacaoService
			.obterNegociacoes()
			.then(negociacoes => {
          			negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
         	 		this._mensagem.texto = 'Negociações do período importadas com sucesso';
        		})
			.catch(error => this._mensagem.texto = error);

		


	}

	_criarNegociacao(){
		return new Negociacao(DateHelper
								.textoParaData(this._inputData.value), 
												parseInt(this._inputQuantidade.value), 
												parseFloat(this._inputValor.value));
	}

	_limpaFormulario(){
		this._inputData.value = '';
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0; 

		this._inputData.focus();
	}

	apaga(){

		ConnectionFactory
			.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.apagaTodos())
			.then(mensagem => {
				this._mensagem.texto = mensagem;
				this._listaNegociacoes.esvazia();
			})
			.catch(error => this._mensagem.texto = error);

	}


	ordena(coluna){
		
		if(this._ordemAtual == coluna){
			
			//inverte ordem
			this._listaNegociacoes.inverteOrdem();
		}else{
			
			this._listaNegociacoes.ordena((a,b) => a[coluna] - b[coluna]);
		}

		this._ordemAtual = coluna;

	}
}





