const jwt = require('jsonwebtoken');
const { Usuario } = require('../db');

const generarJWT = ( uid = '') => {

    return new Promise((resolve, reject)=>{

        // console.log('al llegar ', uid)
        const payload = { uid };

        // console.log('payload', payload)

        jwt.sign(payload, process.env.SECRET_PKEY, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('no se pudo generar el token')
            } else {
                resolve(token);
            }
        })
    });
};

const comprobarJWT = async(token = '') => {

    try {
        
        if (token.length <= 10) {
            return null
        }

        const { uid } = jwt.verify(token, process.env.SECRET_PKEY);
        const usuario = await Usuario.findById( uid );

        if (usuario) {
            if (usuario.status) {
                return usuario
            }
            else{
                return null;
            }
        }else{
            return null;
        }
        
    } catch (error) {
        console.log(error)
        return null
    }

}


module.exports = { generarJWT, comprobarJWT }