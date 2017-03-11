let express = require('express');
let bodyParser = require('body-parser');
require('./dataBase.js')(process.env.NODE_ENV == 'test');

let gameRequire = require('../route/gameRequire.js');
let gameAnalytics = require('../route/gameAnalytics.js');

module.exports = ()=>{
    let app = express();

    app.use(bodyParser.json());                                     
    app.use(bodyParser.urlencoded({extended: true}));               
    app.use(bodyParser.text());                                    
    app.use(bodyParser.json({ type: 'application/json'}));  
    app.use('/game', gameRequire);
    app.use('/analytics', gameAnalytics);

    return app;
};