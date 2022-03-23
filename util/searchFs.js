const { readJsonFile } = require('./readJson');
//     // https://stackoverflow.com/questions/56144629/how-to-fetch-the-value-in-object-array-in-javascript
const buscandoPorNome = async (name, response) => {
  try {
    const dbTalkerObJs = await readJsonFile();
    const dbFiltradoPorNome = dbTalkerObJs.filter((item) => item.name.includes(name));   
    if (!name) {
          if (dbTalkerObJs.length) return response.status(200).json(dbTalkerObJs);      
    }
    if (dbFiltradoPorNome.length === 0) {
      return response.send([]);
    }
    return response.status(200).json(dbFiltradoPorNome);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { buscandoPorNome };
