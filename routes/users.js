const { Router } = require('express');
const { check } = require('express-validator');

const {
    roleValidation,
    emailExiste,
    existeId} = require('../helpers/dbValidation');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole } = require('../middlewares');

const { usersGet,
        usersPost,
        usersPut,
        usersPatch,
        usersDelete } = require('../controllers/users.controller');

const router = Router();

router.get('/', usersGet)

router.post('/',
[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mayor a 6 carateres').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailExiste ),
    check('role').custom( roleValidation ),
    validarCampos
],
usersPost)

router.put('/:id',[
    check('id').isMongoId(),
    check('id').custom( existeId ),
    check('role').custom( roleValidation ),
    validarCampos
], usersPut)

router.patch('/', usersPatch)


router.delete('/:id',[
    validarJWT,
    esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id').isMongoId(),
    check('id').custom( existeId ),
    validarCampos
], usersDelete)


module.exports = router 