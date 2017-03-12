var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = require('../model/User');
var secrets = require('../config/parameters.js');

module.exports = {
    insertUser: (req, res)=>{
        if (!req.body.gameKey || req.body.gameKey != secrets.gameKey) {
            res.status(400).send('Invalid game key');
        } else {
            var userToken = '';
            var user = new User({token: userToken});
            user.save((err, doc) => {
                userToken = jwt.sign({id: doc._id}, secrets.tokenKey, {expiresIn: '10d'});
                var objectId = new mongoose.Types.ObjectId(doc._id);        
                User.findOneAndUpdate({_id: objectId}, {$set: {token: userToken}}, (err, doc) => {
                    res.json({token: userToken});
                });
            });
        }
    }
}