// importando o módulo fs para ser usado de forma assincrona
const fs = require('fs').promises;
/* Função tem por finalidade fazer a leitura de um arquivo json 
e retornar seu conteúdo em formato json */
const leituraConteudo = async () => {
  // fazendo uma tratativa de erro com bloco try catch
  try {
    // fazendo a leitura do arquivo taker.js utilizando o módulo nativo do node, 
    // módulo fs. Para fazer a leitura utilizei a função readFile passando como parametro
    // o caminho de onde se encontra meu arq e fazendo a tratativa da resposta com
    //  BufferEncoding 'utf8' 
    const conteudo = await fs.readFile('./talker.json', 'utf8');
    // Em seguida retorno o conteudo convertendo a resposta para o formato json;
    return JSON.parse(conteudo);
  } catch (error) {
    // caso seja disparado algum erro o bloco catch captura esse erro e retornar 
    // a menssagem desse erro por meio o método message
    return console.log(error.message);
  }
};

// Recebendo  o arquivo a partir da requisição body e adicionando na lista de arquivos
// Ajuda de Danilo Couto e Mentoria de Paulo de Sord
const escrevendoConteudoArq = async (path, arqRetornBody) => {
  try {
   // preparando a função que irá receber o caminho do arquivo original DB(Data Base) 
  const arqDBOriginal = await leituraConteudo();

  // o objeto que será inserido no DB não tem a chave id daí criarei a chave e irei gerar 
 // uma numeração automática para o mesmo ser inserido na lista DB
  const gerandoID = arqRetornBody;
  gerandoID.id = arqDBOriginal.length + 1;
  // fazemos o push para inserir o novo objeto na lista DB
  arqDBOriginal.push(gerandoID);
// agora só falta receber o objeto a partir da requisição que o mesmo irá escrevê-lo devidamente 
// preparado na lista talkers DB e convertendo todo DB em String por meio do método JSON.stringfy
  await fs.writeFile(path, JSON.stringify(arqDBOriginal));
// return uma string com todos os objetos da lista DB
  return gerandoID;
} catch (error) {
  return console.log(error.message);
}
};

module.exports = {
  leituraConteudo,
  escrevendoConteudoArq,  
};
