const {request,response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {
    const {q, nombre = 'No name', apikey} = req.query; //para los "url?nombre=hola&dato=1"
    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey
    });
};
const usuariosPut = async(req, res = response) => {
    const {id} = req.params.id; //para los "url/12"
    const {_id, password, google, correo, ...resto} = req.body;
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findOneAndUpdate(id, resto, {new: true});
    res.json({
        msg: 'put API - Controlador',
        usuario
    });
};
const usuariosPost = async(req, res = response) => {
    const {nombre, correo, password, role} = req.body;
    const usuario = new Usuario({nombre, correo, password, role});
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();
    res.json({
        msg: 'post API - Controlador',
        usuario
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