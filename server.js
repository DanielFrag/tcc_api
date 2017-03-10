var app = require('./config/express.js')();
var port = process.env.PORT || 8080;

app.listen(port, function(){console.log("Server listen port: " + port);});
