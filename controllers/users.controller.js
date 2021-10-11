const Usuario = require('../db/usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const usersGet = (req, res) => {

    const query = req.query; /* aqui se extraen las query params provenientes del GET al url */
    res.json({
        res: 'get',
        query
    })
};

const usersPost = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    
    const { name, email, password, role } = req.body;
    const usuario = new Usuario({name, email, password, role});

    // validar el correo
    const existeEmail = await Usuario.findOne({email});
    if( !existeEmail ){
        return res.status(400).json({
            msg: 'El correo ya existe'
        });
    }

    // encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt);

    // guardar en db
    await usuario.save();

    res.json({
        res: 'post',
        usuario
    })
}
const usersPut = (req, res) => {

    res.json({
        res: 'put'
    })
}
const usersPatch = (req, res) => {

    res.json({
        res: 'patch'
    })
}
const usersDelete = (req, res) => {

    res.json({
        res: 'delete'
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}