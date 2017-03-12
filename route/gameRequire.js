let express = require('express');
let router = express.Router();

let userRegisterController = require('../controller/userRegister');
let requisitionController = require('../controller/requisition');

router.put('/userRegister', userRegisterController.insertUser);

router.use('/user', requisitionController.tokenDecode);
router.post('/user/start', requisitionController.start);
router.post('/user/printedAd', requisitionController.printedAd);
router.post('/user/clickedAd', requisitionController.clickedAd);
router.post('/user/purchase', requisitionController.purchase);

router.get('/date', (req, res)=> {
        let date = new Date();
        res.send(date.toUTCString());
    });

module.exports = router;