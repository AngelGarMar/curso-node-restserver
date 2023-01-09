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

module.exports = {
    esRoleValido, emailExiste, existeUsuarioPorId
};