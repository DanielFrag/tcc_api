let password = require('../config/parameters.js').adminPassword;
let User = require('../model/User.js');
let RequisitionTypeCode = require('../model/RequisitionTypeCode.js');

module.exports = {
    checkPass: (req, res, next)=>{
        if ((req.query && req.query.pass && req.query.pass == password) || (req.body && req.body.pass && req.body.pass == password)) {
            next();
        } else {
            res.status(400).send('Invalid password');
        }
    },
    getUsersData: (req, res)=>{
        User.find({}, (err, docs)=>{
            res.json({users: docs});
        });
    },
    getRequisitionTypeCodes: (req, res)=>{
        RequisitionTypeCode.find({}, (err, docs)=>{
            res.json({reqTypeCodes: docs});
        });
    },
    insertReqType: (req, res)=>{
        if (req.body && req.body.req.typeDescription && req.body.req.code) {
            RequisitionTypeCode.findOne({code: req.body.req.code}, (err, doc)=>{
                if (err) {
                    res.status(400).send('Invalid parameters');
                } else {
                    if (doc) {
                        res.status(200).send('OK');
                    } else {
                        let requisitionTypeCode = new RequisitionTypeCode({typeDescription: req.body.req.typeDescription, code: req.body.req.code});
                        requisitionTypeCode.save((err, doc)=>{
                            if (err) {
                                res.status(400).send('Invalid parameters');
                            } else {
                                res.status(200).send('OK');
                            }
                        });
                    }
                }
            });
        } else {
            res.status(400).send('Invalid parameters');
        }
    }
};