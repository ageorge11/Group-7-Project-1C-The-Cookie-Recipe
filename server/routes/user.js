const router = require('express').Router();
const authController = require('../controllers/user');

router.post ('/register', authController.register);

router.post ('/update', authController.update);

router.post ('/login', authController.login);

router.post ('/forgotPass', authController.forgotPass);

router.post ('/update', authController.update);

router.post ('/logHistory', authController.logHistory);

router.post('', authController.getUser);



module.exports = router;