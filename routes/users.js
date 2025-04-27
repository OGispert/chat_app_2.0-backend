const { Router } = require('express');
const { validateToken } = require('../middlewares/token-validator');
const { getUsers } = require('../controllers/users');

const router = Router();

router.get('/', validateToken, getUsers);

module.exports = router;