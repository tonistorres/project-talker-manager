const express = require('express');
const { escrevendoConteudoArq } = require('../util/readWrite');
const {
   validacaoChavaAut,
   validacaoNome, 
   validaIdade,
   validaPalestra,
   validaDataFormatoBrasil,
   validaAvalicao,
   
  } = require('../middlewares/validations');
 
  const { deletaRegistro } = require('../util/deleteFs');

  const { tratandoObeto } = require('../util/editFS');

 const CAMINHO_DB = './talker.json';

/* Importando a biblioteca para trabalhar com requisiçẽos pelo corpo 
da requisição */

const router = express.Router();
// importando o módulo de leitura do arquivo json talker.json 
const readFileCustom = require('../util/readJson');

// Seguindo Boas Práticas: Criando uma constante 
// para porta e para o Status 200 são valores fixos e tem 
// facilidade de manutenção  modificamos em um único local
// da aplicação e todos demais locais recebem essa alteração 
// automagicamente
const HTTP_OK_STATUS_200 = 200;
const HTTP_OK_STATUS_201 = 201;
const HTTP_OK_STATUS_204 = 204;
const HTTP_OK_STATUS_404 = 404;
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
        return response.status(HTTP_OK_STATUS_200).send(speakPerson);  
      }
      
    return response.status(HTTP_OK_STATUS_200).send([]);  
    } catch (error) {
      return response.status(HTTP_OK_STATUS_404).send(error.message);
    }    
    });
    
 /* Para resolução da questão 2 criaremos uma rota async passando como parâmetro do 
 verbo get o id da função async. Para tratamento de erro utilizando uma estrutura 
 try catch onde o try hospeda no seu escopo os codigo que serão de fato executado 
 e o catch captura qualquer erro que possa ocorrer na execução 
 */   
 router.get('/:id', async (request, response) => {
try {
  /* aqui temos o resultado da requisição que vem embutida no parmas 
  que é um recursos do express que traz várias informaçẽos da requisição 
  logo em seguida eu desconstruo dessa requisição o id que foi passado 
  pelo usuário onde farei uma busca pelo paletrando utilizando o id
  desconstruído e a hof find que me retorna o primeiro objeto encontrado 
  */
    const { id } = request.params;
    const speakPerson = await readFileCustom();
    const findPerson = speakPerson.find((person) => person.id === +id);
    if (!findPerson) {
        return response
        .status(HTTP_OK_STATUS_404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return response.status(HTTP_OK_STATUS_200).send(findPerson);
} catch (error) {
    return response.status(HTTP_OK_STATUS_404).send(error.message);       
}
 });   

 /* Esse end Point tem  por funcionalidade adicionar um pessoa ao 
 arquivo talker.json utilizando funções de escrita e leitura do 
 módulo fs de forma async e fazer as devidas tratativas de erros 
 que vou utilizar middlewar */ 
 router.post('/',
  validacaoChavaAut, 
  validacaoNome, 
  validaIdade,
  validaPalestra,
  validaDataFormatoBrasil,
  validaAvalicao, async (request, response) => {
  // bloco try catch para tratativa de erro
  try {
    // Recebendo o corpo da requisição enviada pelo método POST
    const recebeCorpoReq = request.body; 
    // 
    const adicionando = await escrevendoConteudoArq(CAMINHO_DB, recebeCorpoReq); 
    return response.status(HTTP_OK_STATUS_201).json(adicionando);        
  } catch (error) {
    return response.status(HTTP_OK_STATUS_404).send(error.message);
  }   
 });

 // O endpoint deve ser capaz de editar uma pessoa palestrante com base
 // no id da rota, sem alterar o id registrado.
router.put('/:id',
validacaoChavaAut, 
validacaoNome, 
validaIdade,
validaPalestra,
validaDataFormatoBrasil,
validaAvalicao,
 async (request, response) => {
// const palestrantesEdicao = await editarConteudoArq(request, response);
const listaTratada = await tratandoObeto(request, response);
console.log(listaTratada);
// retornando os palestrantes editados em formato json
return response.status(HTTP_OK_STATUS_200).json(listaTratada);
 });

 // deletando um plestrante da lista 
 router.delete('/:id', validacaoChavaAut, async (request, response) => {
  await deletaRegistro(request);
    response.status(HTTP_OK_STATUS_204).end();
 });

 module.exports = router;
