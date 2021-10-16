const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');

const {validarCampos} = require('../middlewares/validarCampos');

const router = Router();

router.post('/login',[
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'La contraseña es Obligatoria').not().isEmpty(),
    validarCampos
] ,login )