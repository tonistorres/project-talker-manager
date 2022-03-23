const fs = require('fs').promises;

const HTTP_STATUS_404 = 404;

async function leituraConvertArqJson() {
    const baseDados = await fs.readFile('./talker.json', 'utf8');
    const DBConvertidoJson = JSON.parse(baseDados);
    return DBConvertidoJson;
}

const tratandoObeto = async (request, response) => {
    try {
    const listPalestrante = await leituraConvertArqJson();
    const palestranteEdicao = request.body;
    const { id } = request.params;
    const filtradoTalker = listPalestrante
    .filter((palestrante) => palestrante.id === +id);
    const objetoTratado = Object.assign(...filtradoTalker, palestranteEdicao);
    const filtradoTalker2 = listPalestrante.filter((palestrante) => palestrante.id !== +id);
    filtradoTalker2.push(await objetoTratado);
    await fs.writeFile('./talker.json', JSON.stringify(filtradoTalker2));
    return await objetoTratado;
    } catch (error) {
    return response
    .status(HTTP_STATUS_404).json({ message: 'Talker not found!' }); 
    }
};

module.exports = { tratandoObeto };