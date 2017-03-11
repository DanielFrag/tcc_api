var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = require('../model/User');
var secretKey = require('../config/parameters.js').secret;

module.exports = {
    insertUser: (req, res)=>{
        var userToken = '';
        var user = new User({token: userToken});
        user.save((err, doc) => {
            userToken = jwt.sign(doc._id, secretKey, {expiresIn: '10d'});
            var objectId = new mongoose.Types.ObjectId(doc._id);        
            User.findOneAndUpdate({_id: objectId}, {$set: {token: userToken}}, (err, doc) => {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    token: userToken
                }));
            });
        });
    }
}