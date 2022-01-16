
const Usuario = require('../db/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJwt');
const { googleVerify } = require('../helpers/googleVerify');

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        // validar si email existe
        // console.log(req.body)
        const user = await Usuario.findOne({ email });

        // console.log(user)
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario o contraseña no son correctos - correo'
            });
        }
        // validar si usuario está activo

        if (!user.status) {
            return res.status(400).json({
                msg: 'Usuario o contraseña no son correctos - estado: false'
            });
        }
        // validar si pass existe
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                msg: 'Usuario o contraseña no son correctos - pass invalid '
            })
        }


        // generar el JWT

        const token = await generarJWT(user._id)
        // console.log(token)
        res.json({
            user,
            token
        })
    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        })
    }
}

const googleSingIn = async (req, res) => {

    const { id_token } = req.body;

    try {

        const { name, img, email } = await googleVerify(id_token);

        let user = await Usuario.findOne({ email });

        if (!user) {

            // Se debe crear
            const data = {
                name,
                email,
                password: '1234',
                img,
                google: true,
                role: 'USER_ROLE'
            };

            user = new Usuario(data);

            await user.save();
        };

        // si el usuario en DB esta desactivado
        if (!user.status) {
            return res.status(401).json({
                msg: 'hable con el admin, user bloqueado'
            });
        }

        // Generar JWT

        const token = await generarJWT(user._id)

        res.json({
            user,
            token
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
        console.log(error);
    }

}

const renovarToken = async (req, res) => {

    const { usuario } = req;

    // generar el JWT

    const token = await generarJWT(usuario._id)

    res.json({
        usuario,
        token
    })
}

module.exports = {
    googleSingIn,
    login,
    renovarToken
}