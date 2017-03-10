var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = require('../model/User');
var secretKey = require('../config/parameters.js').secret;

module.exports = (req, res)=>{
    var user = new User();
    var userToken = '';
    user.save((err, doc) => {
        userToken = jwt.sign(doc._id, secretKey, {expiresIn: '10d'});
        User.findOneAndUpdate({_id: doc._id}, {$set: {token: userToken}});
        res.json({token: userToken});
    });
}