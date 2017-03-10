var express = require('express');

var gameRequire = require('../route/gameRequire.js');
var gameAnalytics = require('../route/gameAnalytics.js');

module.exports = ()=>{
    var app = express();

    app.use('/game', gameRequire);
    app.use('/analytics', gameAnalytics);

    return app;
};