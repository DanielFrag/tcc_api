var jwt = require('jsonwebtoken');
var secretKey = require('../config/parameters.js').secret;
var RequisitionTypeCode = require('../model/RequisitionTypeCode');
var User = require('../model/User');

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