const { response } = require("express");
const { Producto } = require("../models");

const crearProducto = async(req, res = response) => {
    const {estado, usuario, ...body} = req.body;
    const productoDB = await Producto.findOne({nombre: body.nombre});
    if (productoDB) {
        res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe.`
        });
    }
    const data = {
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
        descripcion: body.categoria,
        categoria: body.categoria
    };
    const producto = new Producto(data);
    await producto.save();
    res.status(201).json(producto);
};

const obtenerProductos = async(req, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        productos
    });
};

const obtenerProducto = async(req, res = response) => {
    const {id} = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'nombre');
    res.json({producto});
};

const actualizarProducto = async(req, res = response) => {
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const producto = await Producto.findByIdAndUpdate(id, data, {new: true}); //true: regresa el nuevo objeto
    res.json(producto);
};

const borrarProducto = async(req, res = response) => {
    const {id} = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});
    res.json(productoBorrado);
};

module.exports = {
    crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto
};