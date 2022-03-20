 const emailValido = require('../util/validationEmail');

 const HTTP_STATUS_400 = 400;
const HTTP_OK_STATUS = 200;

function authorizedMiddleware(_req, res, next) {
  res.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' }); 
  next();   
}

const validationEmailMiddleware = (req, res, next) => {
  const { email } = req.body;
console.log(email);
// Será validado que não é possível fazer login sem o campo "email
if (email === undefined) {
return res.status(HTTP_STATUS_400).json({ message: 'O campo "email" é obrigatório' });
}

// Será validado que não é fazer login sem um email no formato "email@email.com"
const checandoSeEmailValido = emailValido(email);
if (!checandoSeEmailValido) {
  return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
}

if (String(email).length <= 0) {
     return res.status(400).json({ message: 'O campo "email" é obrigatório' });
}
   next();
};

const validationPassWordMiddleware = (req, res, next) => {
  const { password } = req.body;
  // Será validado que não é possível fazer login com o campo "password" menor que 6 caracteres 
  if (String(password).length < 6) {
     return res.status(HTTP_STATUS_400).json({ message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  // Será validado que não é possível fazer login sem o campo "password
  if (password === '' || !password || password === undefined) {
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
   }

   next();
};

module.exports = {
authorizedMiddleware,
validationEmailMiddleware,
validationPassWordMiddleware,
};
