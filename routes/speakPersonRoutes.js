const express = require('express');
const { readJsonFile } = require('../util/readJson');

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

const router = express.Router();

const HTTP_OK_STATUS_200 = 200;
const HTTP_OK_STATUS_201 = 201;
const HTTP_OK_STATUS_204 = 204;
const HTTP_OK_STATUS_404 = 404;

 router.get('/', async (request, response) => {
    try {
      const speakPerson = await readJsonFile();  
      if (speakPerson) {
        return response.status(HTTP_OK_STATUS_200).send(speakPerson);  
      }
    return response.status(HTTP_OK_STATUS_200).send([]);  
    } catch (error) {
      return response.status(HTTP_OK_STATUS_404).send(error.message);
    }    
 });

 router.get('/search', validacaoChavaAut, async (request, response) => {
   const name = request.query.q;
   const dbTalkerObJs = await readJsonFile();
   const dbFiltradoPorNome = dbTalkerObJs.filter((item) => item.name.includes(name));  
   response.status(200).json(dbFiltradoPorNome); 
});

router.get('/:id', async (request, response) => {
try {
    const { id } = request.params;
    const speakPerson = await readJsonFile();
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

 router.post('/',
  validacaoChavaAut, 
  validacaoNome, 
  validaIdade,
  validaPalestra,
  validaDataFormatoBrasil,
  validaAvalicao, async (request, response) => {
  try {
    const recebeCorpoReq = request.body; 
    const adicionando = await escrevendoConteudoArq(CAMINHO_DB, recebeCorpoReq); 
    return response.status(HTTP_OK_STATUS_201).json(adicionando);        
  } catch (error) {
    return response.status(HTTP_OK_STATUS_404).send(error.message);
  }   
 });

router.put('/:id',
validacaoChavaAut, 
validacaoNome, 
validaIdade,
validaPalestra,
validaDataFormatoBrasil,
validaAvalicao,
async (request, response) => {
const listaTratada = await tratandoObeto(request, response);
return response.status(HTTP_OK_STATUS_200).json(listaTratada);
 });

 router.delete('/:id', validacaoChavaAut, async (request, response) => {
  await deletaRegistro(request);
  return response.status(HTTP_OK_STATUS_204).end();
 });

 module.exports = router;
