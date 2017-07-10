const app = require('./config/express.js')();
const port = app.get('port');

app.listen(port, function(){console.log("Server listen port: " + port);});

module.exports = app;