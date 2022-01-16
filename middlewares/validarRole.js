

const esAdminRole = (req, res, next) => {
    if (!req.usuario){
        return res.status(500).json({
            msg: 'se intenta validar el rol sin verificar jwt'
        })

    }

    const { role, name } = req.usuario;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} no es usuario administrador`
        })
    }

    next();
}

const tieneRole = (...role) => {
    return (req, res, next) => {
        if (!req.usuario){
            return res.status(500).json({
                msg: 'se intenta validar el rol sin verificar jwt'
            })    
        }

        if (!role.includes(req.usuario.role)){
            return res.status(401).json({
                msg: `el servicio requiere uno de estos roles ${role}`
            })
        }

        next();
    }

}

module.exports = {
    esAdminRole,
    tieneRole
}