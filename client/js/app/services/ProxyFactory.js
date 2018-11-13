class ProxyFactory {

	static create(objeto, props, acao){
		




		return new Proxy(objeto, {
		    
		    get(target, prop, receiver) {

		        //Verificação se a propriedade é para algum dos métodos e se os mesmos são do tipo função.
		        if(props.includes(prop) && ProxyFactory._ehfuncao(target[prop])){
		            
		            return function(){
		                
		                console.log(`a propriedade ${prop} foi interceptada`); 
		                Reflect.apply(target[prop], target, arguments );
		                return acao(target);
		            }
		        }

		        return Reflect.get(target, prop, receiver);
		    },

		    set(target, prop, value, receiver){

		    	if(props.includes(prop)){
		    		target[prop] = value;
        			acao(target);
		    	}
		    	return Reflect.set(target, prop, value, receiver);
		    }
		});
	}


	static _ehfuncao(func){
		return typeof(func) == typeof(Function)
	}

}


