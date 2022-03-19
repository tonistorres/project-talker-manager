const express = require('express');

const router = express.Router();

// importando o módulo de leitura do arquivo json talker.json 
const readFileCustom = require('../util/readJson');

// Seguindo Boas Práticas: Criando uma constante 
// para porta e para o Status 200 são valores fixos e tem 
// facilidade de manutenção  modificamos em um único local
// da aplicação e todos demais locais recebem essa alteração 
// automagicamente
const HTTP_OK_STATUS = 200;

/** Para resolução do primeiro problema iremos criar uma rota Assincrona
 * daí o uso da particula asyn antes de (request, response) para o tratamento
 * de errro estou utilizando o bloco try catch onde se der tudo ok a execução 
 * fica somente no try, porém, qualquer erro que der o bloco catch captura esse 
 * erro o qual tratai com o retorno de uma mensagem de status(404) capturando 
 * o mesmo com o método message e retornando para que interessar. Para captuar 
 * os dados do Arquivo talker.json utilizei a função readFileCustom devida mente 
 * comentada para fins didáticos, depois fiz uma verificação se speakPerson tiver
 * algo ou seja vier algo nessa constante a mesa será true o que equivale dizer que sim 
 * o array de palestrantes veio e esta prontinho para ser usado neste caso mando o mesmo 
 *  utilizar o status 200 e o metodo send do (express) para enviar para o solicitante o 
 * array com os palestrantes caso isso der ruim o que faço é retornar um array vazio 
 * conforme explicitado pelo teste
  */

 router.get('/', async (request, response) => {
    try {
      const speakPerson = await readFileCustom();  
  
      if (speakPerson) {
        return response.status(HTTP_OK_STATUS).send(speakPerson);  
      }
      
    return response.status(HTTP_OK_STATUS).send([]);  
    } catch (error) {
      return response.status(404).send(error.message);
    }    
    });
    
 router.get('/:id', async (request, response) => {
try {
    const { id } = request.params;
    const speakPerson = await readFileCustom();
    const findPerson = speakPerson.find((person) => person.id === +id);
    if (!findPerson) {
        return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return response.status(HTTP_OK_STATUS).send(findPerson);
} catch (error) {
    return response.status(404).send(error.message);   
}
 });   

    module.exports = router;