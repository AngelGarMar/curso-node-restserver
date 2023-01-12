const { response } = require("express");

const validarArchivoSubir = (req, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) { //archivo es el nombre de la variable desde el postman
        return res.status(400).json({msg: 'No hay archivos en la petición. validarArchivSubir'});
    }
    next();
};

module.exports = {validarArchivoSubir}