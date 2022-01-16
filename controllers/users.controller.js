const Usuario = require('../db/usuario');
const bcrypt = require('bcryptjs');

const usersGet = async (req, res) => {

    const { limite = 5, desde = 0} = req.query;
    const query = {status: true}

    const [usuarios, total] = await Promise.all([
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
        Usuario.countDocuments(query)  
    ])

    // const query = req.query; /* aqui se extraen las query params provenientes del GET al url */
    res.json({
        total,
        usuarios
    })
};

const usersPost = async (req, res) => {

    
    const { name, email, password, role } = req.body;
    const usuario = new Usuario({name, email, password, role});

    console.log(email);
    
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
const usersPut = async (req, res) => {

    const { id } = req.params
    const { email, google, password, ...resto } = req.body;

    if (password){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        res: 'put',
        usuario
    })
}
const usersPatch = (req, res) => {

    res.json({
        res: 'patch'
    })
}
const usersDelete = async (req, res) => {

    const { id } = req.params

    const usuarioEliminado = await Usuario.findByIdAndUpdate(id, {status: false})
    // const usuarioAutenticado = req.usuario

    res.json({
        usuarioEliminado,
        // usuarioAutenticado
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}