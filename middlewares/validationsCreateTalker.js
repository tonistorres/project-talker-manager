// criando constantes de erros 
const HTTP_STATUS_400 = 400;
const HTTP_STATUS_401 = 401;

/** Criando o middlewar valida a requisicao (token)  */
const validacaoChavaAut = (request, response, next) => {
    const chave = request.headers.authorization;
    
    // caso a chave vazia 
    if (!chave) {
        return response
        .status(HTTP_STATUS_401)
        .json({ message: 'Token não encontrado' });
    }

    // retornar mensagem de erro 401 quando a chave for inválida 
    // no atual contexto a chave será inválida quando diferente de 
    // 16 caracketer conforme descrito no requesito 3
    if (chave.length !== 16) {
        return response.status(HTTP_STATUS_401).json({ message: 'Token inválido' });
    }
    
    next();
};
//  meddlewar para validação de nome 
const validacaoNome = (request, response, next) => {
    // recebo o dado de name a partir de uma requisição do verbo POST
    // porém os dados são injetados pleo corpo da requisição onde faço 
    // a descontrução da propriedade name para que eu possa trabalhar a 
    // validação da mesma 
    const { name } = request.body;
    // se !name ou seja se não vier nenhum tipo de dados na requisição ela sera tratada 
    // com uma requisição que não teve sucesso pois não trouxe nenhuma informação come ela 
    if (!name || name === undefined) {
        return response.status(HTTP_STATUS_400).json({ message: 'O campo "name" é obrigatório' });
    }
   // se o comprimento do name for menor que 4 será tratado com uma resposta de erro   
    if (name.length < 4) {
        return response
        .status(HTTP_STATUS_400)
        .json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
    }

    next();
};

// tratativa de erro para Idade
const validaIdade = (request, response, next) => {
    // dados injetados em body e descontruído a propriedade age para trabalhar tratativas de erro
    const { age } = request.body;
    // se diferente de age não veio dado ou campo nao existe por isso undefined
    if (!age || age === undefined) {
        return response.status(HTTP_STATUS_400).json({ message: 'O campo "age" é obrigatório' });
    }
// se age menor que 18 será feito a tratativa de erro 
    if (age < 18) {
        return response
            .status(HTTP_STATUS_400)
            .json({ message: 'A pessoa palestrante deve ser maior de idade' }); 
    }
    next();
};

// tratativa de erro para Paletra 
const validaPalestra = (request, response, next) => {
    // dados injetados em body e descontruído a propriedade talk para trabalhar tratativas de erro
    const { talk } = request.body;
// se não houver algumas das chaves passada como parametro em if fazer a tratativa de erro 
    if (!talk || !talk.watchedAt || !talk.rate) {
        return response
        .status(HTTP_STATUS_400)
        .json(
            { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
            );
        }

    next();
};

// tratativa de erro formato data Brasil 
const validaDataFormatoBrasil = (request, response, next) => {
    // dados injetados em body e descontruído a propriedade watchedAt para trabalhar tratativas de erro
    const { talk: { watchedAt } } = request.body;
    // um regex básico para trabalhar formato de data 
    // ref: https://www.regextester.com/99555
    const expressaoRegular = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/g;
    // fazemos a execução do regex e consequentemente testamos e logo abaixo a tratativa de erro 
    if (!expressaoRegular.test(watchedAt)) {
        return response
          .status(HTTP_STATUS_400)
          .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
      }

    next();
};
// A chave rate deve ser um inteiro de 1 à 5.
const validaAvaliacao = (request, response, next) => {
    // dados injetados em body e descontruído a propriedade rate para trabalhar tratativas de erro
    const { talk: { rate } } = request.body;
    // se rate for diferente de inteiro execute tratativa de erro 
    if (!Number.isInteger(rate)) {
        return response
        .status(HTTP_STATUS_400)
        .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
    }
// se rate for menor que 1 ou rate maior que 5 tratativa de erro 
    if (rate < 1 || rate > 5) {
        return response
        .status(HTTP_STATUS_400)
        .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
    }
    next();
};

module.exports = {
  validacaoChavaAut,
  validacaoNome,
  validaIdade,
  validaPalestra,
  validaDataFormatoBrasil,
  validaAvaliacao,

};
