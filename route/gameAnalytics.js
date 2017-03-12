let express = require('express');
let router = express.Router();
let adminController = require('../controller/admin.js');

router.use('/admin', adminController.checkPass);
router.get('/admin/get_users_data', adminController.getUsersData);
router.get('/admin/get_req_type', adminController.getRequisitionTypeCodes);

module.exports = router;