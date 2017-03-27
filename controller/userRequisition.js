let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let secret = require('../config/parameters.js');
let RequisitionTypeCode = require('../model/RequisitionTypeCode');
let User = require('../model/User');

let pushRequisition = (req, res, callback)=>{
    let userId = req.decoded.id;
    let reqType = parseInt(req.body.type);
    let reqGmt = parseInt(req.body.gmt);
    let reqDate = req.date;

    User.update({
        _id: userId
    }, {
        $push: {
            requisitions: {
                type: reqType,
                date: reqDate,
                gmt: reqGmt
            }
        }
    }, (err, doc)=>{
        if (err) {
            res.status(404).send('Not Found');
        } else {
            if (callback) {
                callback();
            } else {
                res.status(200).send('OK');
            }
        }
    });
}

module.exports = {
    tokenDecode: (req, res, next)=>{
        if (req.body.token) {
            jwt.verify(req.body.token, secret.tokenKey, {ignoreExpiration: true}, (err, decoded)=>{
                if (decoded) {
                    req.decoded = decoded;
                    req.date = new Date();
                    next();
                } else {
                    res.status(400).send('Invalid token');
                }
            });
        } else {
            res.status(400).send('Token not found');
        }
    },
    start: (req, res)=>{
        pushRequisition(req, res, ()=>{
            res.json({jsonData: req.date});
        });
    },
    printedAd: (req, res)=>{
        pushRequisition(req, res);
    },
    clickedAd: (req, res)=>{
        pushRequisition(req, res);
    },
    purchase: (req, res)=>{
        pushRequisition(req, res);
    }
}