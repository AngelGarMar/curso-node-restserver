const dbValidators = require('./db-validators');
const generarJWT = require('./generar-jwt');
const subirArchivo = require('./subir-archivo');

module.exports = {
    ...dbValidators, ...generarJWT, ...subirArchivo //los puntos es para exportar todo, ya se constantes, funciones o lo que sea
}