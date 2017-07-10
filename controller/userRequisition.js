const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secret = require('../config/parameters.js');
const User = mongoose.model('User');
const RequisitionTypeCode = mongoose.model('RequisitionTypeCode');

async function pushRequisition(req, res, callback) {
    try{
        await User.update({
                _id: req.decoded.id
            }, {
                $push: {
                    requisitions: {
                        type: req.type,
                        date: req.date,
                        gmt: parseInt(req.body.gmt)
                    }
                }
            });
        if (callback) {
            return callback();
        } else {
            return res.status(200).send('OK');
        }
    } catch(e) {
        return res.status(200).send('Can not insert the requisition');
    }
}

async function findRequisitionType(code) {
    return await RequisitionTypeCode
        .findOne({code: code})
        .lean();
}

module.exports = {
    tokenDecode: (req, res, next) => {
        try {
            if (req.body.token) {
                const decoded = jwt.verify(req.body.token, secret.tokenKey, {ignoreExpiration: true});
                req.decoded = decoded;
                req.date = new Date();
                next();
            } else {
                return res.status(400).send('Missing token param');
            }
        } catch(e) {
            return res.status(401).send('Invalid token');
        }
    },
    start: async (req, res) => {
        req.type = (await findRequisitionType(1)).typeDescription;
        pushRequisition(req, res, () => {
            return res.json({jsonData: req.date});
        });
    },
    printedAd: async (req, res) => {
        req.type = (await findRequisitionType(2)).typeDescription;
        pushRequisition(req, res);
    },
    clickedAd: async (req, res) => {
        req.type = (await findRequisitionType(3)).typeDescription;
        pushRequisition(req, res);
    },
    purchase: async (req, res) => {
        req.type = (await findRequisitionType(4)).typeDescription;
        pushRequisition(req, res);
    }
}