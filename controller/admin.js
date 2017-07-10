const password = require('../config/parameters.js').adminPassword;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const RequisitionTypeCode = mongoose.model('RequisitionTypeCode');

module.exports = {
    checkPass: (req, res, next) => {
        if ((req.query && req.query.pass && req.query.pass == password) || (req.body && req.body.pass && req.body.pass == password)) {
            next();
        } else {
            res.status(400).send('Invalid password');
        }
    },
    getUsersData: (req, res) => {
        User.find({}, (err, docs) => {
            res.json({users: docs});
        });
    },
    getRequisitionTypeCodes: (req, res) => {
        RequisitionTypeCode.find({}, (err, docs) => {
            res.json({reqTypeCodes: docs});
        });
    },
    insertReqType: async (req, res) => {
        try{
            if (req.body && req.body.req.typeDescription && req.body.req.code) {
                await RequisitionTypeCode.findOneAndUpdate({
                        code: req.body.req.code
                    }, {
                        typeDescription: req.body.req.typeDescription,
                        code: req.body.req.code
                    }, {
                        upsert: true
                    });
                return res.status(200).send('OK');
            } else {
                return res.status(400).send('Invalid parameters');
            }
        } catch (e) {
            return res.status(500).send('Can not insert the requested requisition type');
        }
    }
};