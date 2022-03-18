/** Depois de instalarmos o Express iremos adicionanar
 * todos seus recurso a uma constante que nomeei de express
*/
const express = require('express');

/* Importando a biblioteca para trabalhar com requisiçẽos pelo corpo 
da requisição */
const bodyParser = require('body-parser');

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

/* Agora vou criar um mine servidor web local em mémoria 
com o método listen do express ela recebe como parametro
a porta onde esse servidor. É comum passarmos uma callback
para informar ao usuario que o servidor está rodando 
*/

app.listen(PORT, () => {
  console.log('Online');
});
