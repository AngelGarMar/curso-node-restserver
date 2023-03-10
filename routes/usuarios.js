const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet,usuariosPut,usuariosPost,usuariosDelete,usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

//const { validarCampos } = require('../middlewares/validar-campos');
//const { validarJWT } = require('../middlewares/validar-jwt');
//const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const {validarCampos, validarJWT, esAdminRole, tieneRole} = require('../middlewares');

const router = Router();

router.get('/', usuariosGet);
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom((role) => esRoleValido(role)),
    validarCampos
], usuariosPut);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe contener más de 6 letras').isLength({min: 6}),
    check('correo').custom(emailExiste),
    //check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE'],
    check('role').custom((role) => esRoleValido(role)),
    validarCampos
], usuariosPost);
router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE', 'USER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;