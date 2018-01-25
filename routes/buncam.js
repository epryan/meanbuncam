var express = require('express');
var router = express.Router();

//Require controller modules
var buncam_controller = require('../controllers/buncamController');

/// BUNCAM ROUTES ///

//GET buncam homepage
router.get('/', buncam_controller.index);

//GET request for a specific bunpic
// may not be used, single page carosel may be preferred
//router.get('/buncam/:id', buncam_controller.image_detail);

module.exports = router;
