const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const usuario = require('../models/usuario');

const esRoleValido = async(role = '') => {
    const existeRol = await Role.findOne({role});
    if (!existeRol) {
        throw new Error(`El rol ${role} no está registrado en la base de datos`);
    }
}

const emailExiste = async(correo = '') => {
    const existeEmail = await usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El ID no existe: ${id}`);
    }
}

const existeCategoriaPorId = async(id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El ID no existe: ${id}`);
    }
}

const existeProductoPorId = async(id) => {
    const existeProducto = await Producto.findById(id);
    console.log(existeProducto);
    if (!existeProducto) {
        throw new Error(`El ID no existe: ${id}`);
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida. ${colecciones}`);
    }
    return true;
};

module.exports = {
    esRoleValido, emailExiste, existeUsuarioPorId, existeCategoriaPorId, existeProductoPorId, coleccionesPermitidas
};