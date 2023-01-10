const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, esAdminRole } = require('../middlewares');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

//obtener todas las categorias, publico
router.get('/', obtenerProductos);

//obtener una categoria por id, publico
router.get('/:id', [
    check('id', 'No es un id de mongo válido.').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
    ], obtenerProducto);

//crear categoria - privado - cualquier persona con tun token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('categoria', 'No es un id de mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
    ], crearProducto);

//actualizar - privado - cualquier con token privado
router.put('/:id', [
    validarJWT,
    check('categoria', 'No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto);

//borrar una categoria, solo si es admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], [
], borrarProducto);

module.exports = router;