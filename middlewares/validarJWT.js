const jwt = require('jsonwebtoken');

const Usuario = require('../db/usuario');

const validarJWT = async (req, res, next) => {

    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    
    try {

        const { uid } = jwt.verify(token, process.env.SECRET_PKEY);
    
        const usuario = await Usuario.findById(uid);

        if ( !usuario ){
            return res.status(401).json({
                msg: 'token no valido - usuario no existe en DB'
            })
        }

        if (!usuario.status){
            return res.status(401).json({
                msg: 'token no valido - usuario con estado en false'
            })
        }
        



        req.usuario = usuario
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }

}

module.exports = {
    validarJWT
}