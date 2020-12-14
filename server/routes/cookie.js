const router = require('express').Router();
const cookieController = require('../controllers/cookie');

router.post ('/get', cookieController.get);

//router.post ('/comment', cookieController.comment);
router.post ('/getRating', cookieController.getRating);

router.post ('/rate', cookieController.rate);

//router.post ('/search', cookieController.search);

//cookie create 
router.post ('/add', cookieController.add);

module.exports = router;