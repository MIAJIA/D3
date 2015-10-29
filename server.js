// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var path           = require('path');

// configuration ===========================================

// config files

var port = process.env.PORT || 3008; // set our port

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(express.static(__dirname + '/app')); // set the static files location /public/img will be /img for users

app.set('views', path.join(__dirname, '/views')); // Convenience since it's the fault anyway.
app.set('view engine', 'jade');

// routes ==================================================
app.get('*', function(req, res, next) {
	res.render('app/index.html');
});

// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app