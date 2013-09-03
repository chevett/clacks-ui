
var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	settings = require('./settings')()
;

var app = express();


// settings
app.set('port', process.env.PORT || settings.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');


// middleware
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
app.use(function(err, req, res, next){
	console.log('mt3 global error handler: ');
	console.log(err);
	res.end();
});


// routing
app.get('/', routes.home);
app.get('/scripts/handlebars.js', routes.handlebars);
app.get('/scripts/templates.js', routes.templates);


// start
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
