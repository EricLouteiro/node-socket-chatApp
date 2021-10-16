const Role = require('../db/role');
const Usuario = require('../db/usuario');

const roleValidation = async (role = '') => {
    const existeRol = await Role.findOne({role});
    console.log(existeRol);
    if(!existeRol){
        throw new Error(`El rol ${role} no está registrado en DB`)
    }
}

const emailExiste = async (email) => {
    const existeEmail = await Usuario.findOne({email});
    if (existeEmail){
        throw new Error('El email ya existe');
    }
}


const existeId = async (id) => {
    const idmng = await Usuario.findById(id)
    if (!idmng){
        throw new Error(`El id no existe ${id}`)
    }
}
module.exports = {
    roleValidation,
    emailExiste,
    existeId
}