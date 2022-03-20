/* A função valida email, se utiliza de um regex para fazer tal validação 
o retorno dessa função é do tipo boolean true e false 
*/
function validEmail(email) {
    return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
}
module.exports = validEmail;