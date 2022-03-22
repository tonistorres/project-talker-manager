const fs = require('fs').promises;

const HTTP_STATUS_404 = 404;

async function leituraConvertArqJson() {
    const baseDados = await fs.readFile('./talker.json', 'utf8');
    const DBConvertidoJson = JSON.parse(baseDados);
    return DBConvertidoJson;
}
    
// Logica da ediçao do arquivo talker.json
const editarConteudoArq = async (request, response) => {
try {    
    const listPalestrante = await leituraConvertArqJson();
    // capturando o corpo e o parâmetro passado pelo id por meio da requisição do verbo PUT
    const palestranteEdicao = request.body;
    const { id } = request.params;
    // O método findIndex() retorna o índice no array do primeiro elemento que satisfizer a função de teste provida. Caso contrário, retorna -1, indicando que nenhum elemento passou no teste. Nesse trecho de código criamos uma contante de nome idPalestrante que receberá o índice do primeiro elemento que satisfez a condição onde comparamos o id da lista de palestrantes contida num array de objeto com o id capturado por reques.params e retornamos o índice do elemento comparado e atribuímos esse índice a constante idPalestrante 
    const idPalestrante = listPalestrante
    .findIndex((palestrante) => palestrante.id === Number(id));
    if (idPalestrante === -1) {
 response
    .status(HTTP_STATUS_404).json({ message: 'Talker not found!' }); 
}
    listPalestrante[idPalestrante] = { ...listPalestrante[idPalestrante], ...palestranteEdicao };
    await fs.writeFile('./talker.json', JSON.stringify(listPalestrante));
    return listPalestrante[idPalestrante];
} catch (error) {
    console.log(error.message);
}
};

module.exports = { editarConteudoArq };
