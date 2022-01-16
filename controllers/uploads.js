const { subirArchivo } = require('../helpers/subirArchivo')
const { Usuario, Producto } = require('../db');
const path = require('path');
const fs = require('fs');

const cargarArchivo = async (req, res) => {

    try {


        const media = await subirArchivo(req.flies, undefined, 'Img')

        res.json({
            media
        });

    } catch (error) {
        res.status(400).json({
            error
        })
    }

}

const actualizarImagen = async (req, res) => {

    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe el usuario con el id ${id}`
                });
            }

            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe el Producto con el id ${id}`
                });
            }

        default:
            return res.status(500).json({ msg: 'No se validó esta opción' });
    }

    // limpiar imagenes previas
    if (modelo.img) {
        // hay que borrar la img
        const pathImage = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
        }
    }
   
    modelo.img = await subirArchivo(req.files, undefined, coleccion)

    await modelo.save();

    res.json({
        coleccion,
        id
    })

}

const mostrarImagen = async (req, res) => {

    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe el usuario con el id ${id}`
                });
            }

            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe el Producto con el id ${id}`
                });
            }

        default:
            return res.status(500).json({ msg: 'No se validó esta opción' });
    }

    if (modelo.img) {
        // hay que borrar la img
        const pathImage = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage)
        }
    }

    const noImage = path.join(__dirname, '../assets', 'no-image.jpg')
    res.sendFile(noImage);
}


module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}