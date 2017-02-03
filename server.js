var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.route('/date')
	.get(function(req, res) {
		var date = new Date();
		res.send(date.toUTCString());
	});

app.listen(port, function(){console.log("Servidor escutando porta " + port);});
