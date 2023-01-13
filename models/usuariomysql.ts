import {DataTypes} from 'sequelize';
import db from '../database/connectionmysql';

const UsuarioMySQL = db.define('Usuario', {
    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    }
});

module.exports = {UsuarioMySQL};