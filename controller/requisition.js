let jwt = require('jsonwebtoken');
let secretKey = require('../config/parameters.js').secret;
let RequisitionTypeCode = require('../model/RequisitionTypeCode');
let User = require('../model/User');

module.exports = {
    tokenDecode: (req, res, next)=>{
        let id = jwt.verify(req.body.token,secretKey, {ignoreExpiration: true}, (err, decoded)=>{
            if (decoded) {
                req.decoded = decoded;
                next();
            } else {
                res.status(400).send('Invalid token');
            }
        });
    },
    start: (req, res)=>{
        res.json({date: new Date()});
    },
    printedAd: (req, res)=>{
        res.json({err: 'not implemented'});
    },
    clickedAd: (req, res)=>{
        res.json({err: 'not implemented'});
    },
    purchase: (req, res)=>{
        res.json({err: 'not implemented'});
    }
}