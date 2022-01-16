const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers/generarJwt");
const ChatMensaje = require('../models/chat-mensajes');

const chatMensaje = new ChatMensaje

const socketController = async( socket = new Socket(), io ) => {

    // console.log(socket);
    const usuario = await comprobarJWT( socket.handshake.headers.authorization)

    // // console.log(usuario)
    if (!usuario) {
        return socket.disconnect();
    }

    // Agregar el usuario conectado
    chatMensaje.conectarUsuario( usuario );
    io.emit('usuarios-activos', chatMensaje.usuariosArr)

    // Limpiar cuando un usuario se desconecta
    socket.on('disconnect', ()=> {

        chatMensaje.desconectarUsuario(usuario.id)
        io.emit('usuarios-activos', chatMensaje.usuariosArr)
    })

}

module.exports = {socketController}