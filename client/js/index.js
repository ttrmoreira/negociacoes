var campos = [
	document.querySelector('#data'),
	document.querySelector('#valor'),
	document.querySelector('#quantidade')
];

console.log(campos);
var tbody = document.querySelector('table tbody');
document.querySelector(".form").addEventListener("submit", function(){
	
	/*O input realiza o recarregamento da página e faz com que a tr 
	montada seja perdida. O código abaixo serve para manter a requisição 
	assíncrona e a página não tenha que ser recarregada*/
	event.preventDefault();



	var tr = document.createElement('tr');
	campos.forEach(function(campo){
		var td = document.createElement('td');
		td.textContent = campo.value;
		tr.appendChild(td);
	});
	var tdVolume = document.createElement('td');
	tdVolume.textContent = campos[1].value * campos[2].value;
	tr.appendChild(tdVolume);

	tbody.appendChild(tr);

	campos[0].value = '';
	campos[1].value = 1;
	campos[2].value = 0;

	campos[0].focus();
});
