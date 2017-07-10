const express = require('express');
const bodyParser = require('body-parser');
require('./dataBase.js')();
require('../model/User.js');
const fs = require('fs');
const models = fs.readdirSync(require('path').resolve( './model'));
models.forEach(model => {
    require(require('path').resolve( './model/' + model));
});
const gameRequire = require('../route/gameRequire.js');
const gameAnalytics = require('../route/gameAnalytics.js');
const parameters = require('./parameters.js');

module.exports = ()=>{
    const app = express();
    app.set('port', parameters.port);
    app.use(bodyParser.json({ type: 'application/json'}));  
    app.use('/game', gameRequire);
    app.use('/analytics', gameAnalytics);

    return app;
};