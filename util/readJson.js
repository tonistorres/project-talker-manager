const fs = require('fs').promises;

const readJsonFile = async () => {
    try {
        const dataBuffer = await fs.readFile('./talker.json', 'utf-8');
        const dataJson = JSON.parse(dataBuffer);
        return dataJson;
    } catch (error) {
        console.log(`Erro modulo de Leiturra ${error.message}`);
    }
};

module.exports = { readJsonFile };