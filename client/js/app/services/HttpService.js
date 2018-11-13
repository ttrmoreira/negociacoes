class HttpService{


	get(url){
				return new Promise((resolve, reject) =>{

			let xhr = new XMLHttpRequest();
			
			/*Configurações
			
				0: requisição ainda não iniciada

				1: conexão com o servidor estabelecida

				2: requisição recebida

				3: processando requisição

				4: requisição está concluída e a resposta está pronta


			*/
			
			xhr.open('GET', url);
			console.log(xhr.readyState);

			xhr.onreadystatechange = () => {
				if(xhr.readyState == 4){
					if(xhr.status == 200){

						resolve(JSON.parse(xhr.responseText));
	            	} else {
	            		
	            		console.log(xhr.responseText);
	            		reject(xhr.responseText);

	            	}
				}
			};
			
			/*Executa*/
			xhr.send();

		});
	}



	 post(url, dado) {


            return new Promise((resolve, reject) => {

                let xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.onreadystatechange = () => {

                    if (xhr.readyState == 4) {

                        if (xhr.status == 200) {

                            resolve(JSON.parse(xhr.responseText));
                        } else {

                            reject(xhr.responseText);
                        }
                    }
                };
                xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string no formato JSON.
            });

        }
}