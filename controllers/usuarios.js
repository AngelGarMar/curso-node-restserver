const {request,response} = require('express');

const usuariosGet = (req = request, res = response) => {
    const {q, nombre = 'No name', apikey} = req.query; //para los "url?nombre=hola&dato=1"
    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey
    });
};
const usuariosPut = (req, res = response) => {
    const id = req.params.id; //para los "url/12"
    res.json({
        msg: 'put API - Controlador'
    });
};
const usuariosPost = (req, res = response) => {
    const body = req.body;
    res.json({
        msg: 'post API - Controlador'
    });
};
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controlador'
    });
};
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    });
};

module.exports = {
    usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch
};