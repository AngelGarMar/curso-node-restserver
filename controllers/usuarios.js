const {request,response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {
    //const {q, nombre = 'No name', apikey} = req.query; //para los "url?nombre=hola&dato=1"
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};
    /*const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite));
    const total = await Usuario.countDocuments(query);*/
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
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
    res.json(
        usuario
    );
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
const usuariosDelete = async(req, res = response) => {
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.json(usuario);
};
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    });
};

module.exports = {
    usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch
};