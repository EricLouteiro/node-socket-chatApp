
const validarCampos= require('../middlewares/validarCampos');
const validarJWT = require('../middlewares/validarJWT');
const validarRole = require('../middlewares/validarRole');
const validarArchivo = require('../middlewares/validarArchiv')

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRole,
    ...validarArchivo
}