const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn, renovarToken } = require('../controllers/auth');
const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

router.post('/login', [
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'La contraseña es Obligatoria').not().isEmpty(),
    validarCampos
], login )

router.post('/google', [
    check('id_token', 'El id_token es requerido').not().isEmpty(),
    validarCampos
], googleSingIn )

router.get('/', validarJWT, renovarToken)

module.exports = router