const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.js');

router.use('/admin', adminController.checkPass);
router.get('/admin/get_users_data', adminController.getUsersData);
router
    .route('/admin/req_type')
    .get(adminController.getRequisitionTypeCodes)
    .put(adminController.insertReqType);
    
module.exports = router;