let app = require('./config/express.js')();
let port = process.env.PORT || 8080;

app.listen(port, function(){console.log("Server listen port: " + port);});

module.exports = app;