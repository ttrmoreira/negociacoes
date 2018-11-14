class NegociacaoDao{

    constructor(connection){
        this._connection = connection;
        this._store = 'negociacoes'
    }


    adiciona(negociacao){
        
        return new Promise((resolve, reject) => {


            let request = this._connection
                            .transaction([this._store],'readwrite')
                            .objectStore(this._store)
                            .add(negociacao);
  
              request.onsuccess = e => {
  
                resolve();
              };
  
              request.onerror = e => {
  
                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação');
              };
        });
    }


    listaTodos(){

        return new Promise ((resolve, reject) => {


            let negociacoes = [];

            /* O cursor é o responsável por passear pelos dados da Object Store. 
            Ele tem um ponteiro para o primeiro, segundo e os demais elementos 
            ordenados. Sabemos que depois, ele chamará os elementos para cada 
            item do banco. Se temos dez negociações, o onsuccess será chamado 
            o mesmo número de vezes. E quando este evento é chamado 
            em e.target.result, temos o ponteiro atual do cursor. No if, 
            testaremos se o ponteiro existe, caso o resultado seja positivo, 
            vamos pedir o dado para o ponteiro. */

            let cursor = this._connection
                            .transaction([this._store],'readwrite')
                            .objectStore(this._store)
                            .openCursor();

            // 
            cursor.onsuccess = e => {

            	let atual = e.target.result;

                 if(atual) {

                     let dado = atual.value;
                     negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                     atual.continue();

                 } else { 

                     // quando não há mais objects em nossa store.
                     // Isso significa que já terminados de popular negociacoes
                    resolve(negociacoes);
                    console.log(negociacoes);
                 }	

            };

            cursor.onerror = e => {
                console.log('Error:' + e.target.error.name);
                reject('Não foi possível listar as negociações');
            };






        });
    }

    apagaTodos(){

		return new Promise((resolve, reject)=>{


            let request = this._connection
            .transaction([this._store],'readwrite')
            .objectStore(this._store)
            .clear();

            request.onsuccess = e => resolve('Negociações removidas com sucesso');

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível remover as negociações');
            }


		});
	}
}