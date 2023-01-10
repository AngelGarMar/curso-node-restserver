const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, esAdminRole } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

//obtener todas las categorias, publico
router.get('/', obtenerCategorias);

//obtener una categoria por id, publico
router.get('/:id', [
    check('id', 'No es un id de mongo válido.').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], obtenerCategoria);

//crear categoria - privado - cualquier persona con tun token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    validarCampos
    ], crearCategoria);

//actualizar - privado - cualquier con token privado
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria);

//borrar una categoria, solo si es admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], [
], borrarCategoria);

module.exports = router;