const fs = require('fs').promises;

const leituraConteudo = async () => {
  try {
    const conteudo = await fs.readFile('./talker.json', 'utf8');
    return JSON.parse(conteudo);
  } catch (error) {
    return console.log(error.message);
  }
};

const escrevendoConteudoArq = async (path, arqRetornBody) => {
  try {
  const arqDBOriginal = await leituraConteudo();
  const gerandoID = arqRetornBody;
  gerandoID.id = arqDBOriginal.length + 1;
  arqDBOriginal.push(gerandoID);
  await fs.writeFile(path, JSON.stringify(arqDBOriginal));
  return gerandoID;
} catch (error) {
  return console.log(error.message);
}
};

module.exports = {
  leituraConteudo,
  escrevendoConteudoArq,  
};
