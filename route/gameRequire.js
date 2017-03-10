var express = require('express');
var router = express.Router();

var userRegisterController = require('../controller/userRegister');
/*
router.use(()=>{
    console.log('middleware de gameRequire');
});
*/

router.post('/userRegister', (req, res) => {userRegisterController(req, res)});
/*
router.post('/start');
router.post('/printedAd');
router.post('/clickedAd');
router.post('/purchase');
*/
router.get('/date', (req, res)=> {
        var date = new Date();
        res.send(date.toUTCString());
    });

module.exports = router;