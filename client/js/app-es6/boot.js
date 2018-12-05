import {currentInstance} from './controllers/NegociacaoController';
import {} from './polyfill/fetch';

let negociacaoController = currentInstance();



document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('button[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);