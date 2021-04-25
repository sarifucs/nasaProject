const router = require('express').Router();
const user = require('../controllers/user');
const nasaImages = require('../controllers/nasaImage');
const { decoded } = require('../middlewares/checkPermissions');
// const { decode } = require('jsonwebtoken');


router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

router.post('/createUser', user.createUser);
router.post('/loginUser', user.loginUser);

router.get('/getAllNasaImagesByUserId', decoded, nasaImages.getAllNasaImagesByUserId);
router.post('/postNasaImageByUserId',decoded, nasaImages.postNasaImageByUserId);
router.post('/deleteNasaImageByUserId', decoded, nasaImages.deleteNasaImageByUserId);

module.exports = router;