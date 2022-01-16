const Role = require('../db/role');
const {Usuario, Categoria} = require('../db');

const roleValidation = async (role = '') => {
    const existeRol = await Role.findOne({role});
    // console.log(existeRol);
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

const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById(id)
    if (!existeCategoria){
        throw new Error(`El id no existe ${id}`)
    }
}

const existeProductoPorId = async( id ) => {

    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if ( !incluida ) {
        throw new Error(`La colleccion ${coleccion} no está permitida`)
    }

    return true;
}


module.exports = {
    roleValidation,
    emailExiste,
    existeId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}