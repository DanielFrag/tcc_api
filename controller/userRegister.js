const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const parameters = require('../config/parameters.js');

module.exports = {
    insertUser: async (req, res) => {
        try{
            if (!req.body.gameKey || req.body.gameKey != parameters.gameKey) {
                res.status(400).send('Invalid game key');
            } else {
                let userToken = '';
                const userObj = await User.create({token: userToken});
                userToken = jwt.sign({id: userObj._id}, parameters.tokenKey, {expiresIn: '10d'});
                await User.findOneAndUpdate({_id: userObj._id}, {$set: {token: userToken}});
                return res.json({jsonData: userToken});
            }
        } catch (e) {
            return res.status(500).send('Can not insert the requested user');
        }
    }
}