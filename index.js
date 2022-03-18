/** Depois de instalarmos o Express iremos adicionanar
 * todos seus recurso a uma constante que nomeei de express
*/
const express = require('express');

/* Importando a biblioteca para trabalhar com requisiçẽos pelo corpo 
da requisição */
const bodyParser = require('body-parser');

// importando o módulo de leitura do arquivo json talker.json 
const readFileCustom = require('./util/readJson');
/* agora irei criar uma instancia de express essa instancia
a partir desse momento irá me da acesso a vários métodos do 
frameWork Express
*/
const app = express();
// aqui setando ela dizendo que iremos fazer uso dela em algum momento
app.use(bodyParser.json());

// Seguindo Boas Práticas: Criando uma constante 
// para porta e para o Status 200 são valores fixos e tem 
// facilidade de manutenção  modificamos em um único local
// da aplicação e todos demais locais recebem essa alteração 
// automagicamente
const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

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
app.get('/talker', async (request, response) => {
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

/* Agora vou criar um mine servidor web local em mémoria 
com o método listen do express ela recebe como parametro
a porta onde esse servidor. É comum passarmos uma callback
para informar ao usuario que o servidor está rodando 
*/

app.listen(PORT, () => {
  console.log('Online');
});
