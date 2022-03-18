// fazendo a importação do módulo fs que é um módulo nativo
// do node.js neste caso irei trabalhar com promises o que
// impede do meu módulo fs se tornar bloqueante pois a paritr 
// desse ponto vou trabalhar com promises (promessa)
const fs = require('fs').promises;
// Aqui irei construir uma arrow function que receberá duas particulas importantes 
// async e await que transforma de fato minha função readJsonFile em assincrona
const readJsonFile = async () => {
    // irei utilizar um bloco de tratamento de erro try catch onde irei 
    // captuar o error e usar o método message para printar na tela 
    // caso de algo errado.
    try {
        //  Nesse ponto temos os dados brutos de talker.json,
        // (em um Buffer) 
        const dataBuffer = await fs.readFile('./talker.json');
        // convertendo os dados de Buffer para Json para isso utilizamos 
        // o método JSON.parse
         const dataJson = JSON.parse(dataBuffer);
           return dataJson;
    } catch (error) {
        console.log(`Erro modulo de Leiturra ${error.message}`);
    }
};

// readJsonFile();
module.exports = readJsonFile;