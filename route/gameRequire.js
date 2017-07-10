const express = require('express');
const router = express.Router();

const userRegisterController = require('../controller/userRegister.js');
const requisitionController = require('../controller/userRequisition.js');

router.post('/userRegister', userRegisterController.insertUser);

router.use('/user', requisitionController.tokenDecode);
router.post('/user/start', requisitionController.start);
router.post('/user/printedAd', requisitionController.printedAd);
router.post('/user/clickedAd', requisitionController.clickedAd);
router.post('/user/purchase', requisitionController.purchase);

router.get('/date', (req, res)=> {
        const date = new Date();
        res.send(date.toUTCString());
    });

module.exports = router;