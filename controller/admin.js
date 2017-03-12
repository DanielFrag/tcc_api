let password = require('../config/parameters.js').pass;
let User = require('../model/User.js');
let RequisitionTypeCode = require('../model/RequisitionTypeCode.js');

module.exports = {
    checkPass: (req, res, next)=>{
        if (res.body.pass == password) {
            next();
        } else {
            res.status(400).send('Invalid password');
        }
    },
    getUsersData: (req, res)=>{
        User.find({}, (err, docs)=>{
            res.json(docs);
        });
    },
    getRequisitionTypeCodes: (req, res)=>{
        RequisitionTypeCode.find({}, (err, docs)=>{
            res.json(docs);
        });
    }
};