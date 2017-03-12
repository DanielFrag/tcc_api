let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let secret = require('../config/parameters.js');
let RequisitionTypeCode = require('../model/RequisitionTypeCode');
let User = require('../model/User');

module.exports = {
    tokenDecode: (req, res, next)=>{
        jwt.verify(req.body.token, secret.tokenKey, {ignoreExpiration: true}, (err, decoded)=>{
            if (decoded) {
                req.decoded = decoded;
                next();
            } else {
                res.status(400).send('Invalid token');
            }
        });
    },
    start: (req, res)=>{
        let userId = req.decoded.id;
        let reqType = parseInt(req.body.type);
        let reqGmt = parseInt(req.body.gmt);
        let reqDate = new Date();

        User.update({
            _id: userId
        }, {
            $push: {
                requisitionsByType: {
                    type: reqType,
                    date: reqDate,
                    gmt: reqGmt
                }
            }
        }, (err, doc)=>{
            if (err) {
                res.status(404).send('Not Found');
            } else {
                res.json({date: reqDate});
            }
        });
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