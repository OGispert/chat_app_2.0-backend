const { Router } = require('express');
const { validateToken } = require('../middlewares/token-validator');
const { getMessages } = require('../controllers/messages');

const router = Router();

router.get('/:from', validateToken, getMessages);

module.exports = router;