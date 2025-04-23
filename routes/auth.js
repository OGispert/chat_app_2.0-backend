const { Router } = require('express');
const { createUser, login, renewToken } = require('../controllers/authCtrl');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/field-validator');
const { validateToken } = require('../middlewares/token-validator');

const router = Router();

router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('name', 'Name cannot contain numbers').isAlpha(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not in the right format').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must contain at least 1 lowercased letter, 1 uppercased letter, 1 number and 1 symbol').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validateField
], createUser);

router.post('/', [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not in the right format').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateField
], login);

router.get('/renew', validateToken, renewToken);

module.exports = router;