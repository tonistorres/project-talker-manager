/** Depois de instalarmos o Express iremos adicionanar
 * todos seus recurso a uma constante que nomeei de express
*/
const express = require('express');
const bodyParser = require('body-parser');
const { 
  validationEmailMiddleware,
  validationPassWordMiddleware,
 } = require('./middlewares/validations');

/* Importando a biblioteca para trabalhar com requisiçẽos pelo corpo 
da requisição */

/* agora irei criar uma instancia de express essa instancia
a partir desse momento irá me da acesso a vários métodos do 
frameWork Express
*/
const app = express();
const speakPersonRoutes = require('./routes/speakPersonRoutes');

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

// nesse ponto estou injetando todas minhas 
// rotas dentro do arquivo index.js 
app.use('/talker', speakPersonRoutes);
// a rota login utiliza dois middlewar para fazer validações no percuso 
// até chegar na lógica principal da rota 
app.post('/login', validationEmailMiddleware, validationPassWordMiddleware,
async (req, res) => {
res.status(200).json({ token: '7mqaVRXJSp886CGr' });
});
/* Agora vou criar um mine servidor web local em mémoria 
com o método listen do express ela recebe como parametro
a porta onde esse servidor. É comum passarmos uma callback
para informar ao usuario que o servidor está rodando 
*/
app.listen(PORT, () => {
  console.log('Online');
});
