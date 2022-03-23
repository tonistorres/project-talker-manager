const fs = require('fs').promises;

async function leituraConvertArqJson() {
    const baseDados = await fs.readFile('./talker.json', 'utf8');
    const DBConvertidoJson = JSON.parse(baseDados);
    return DBConvertidoJson;
}

const deletaRegistro = async (request) => {
try {
  const { id } = request.params;
  const listPalestrante = await leituraConvertArqJson();
  const listaFiltrada = listPalestrante
  .filter((palestrante) => palestrante.id !== +id);
  await fs.writeFile('./talker.json', JSON.stringify(listaFiltrada));
} catch (error) {
    console.log(error.message);
}
};

module.exports = { deletaRegistro };