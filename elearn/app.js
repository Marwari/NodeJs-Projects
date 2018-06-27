var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/elearn');
var db = mongoose.connection;
async = require('async');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var classesRouter = require('./routes/classes');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session middleware
app.use(session({
	secret: 'secret',
	saveUninitiated: true,
	resave: true
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// validator 
app.use(expressValidator({
	errorFormatter: function(param, msg, valur){
		var namespace = param.split('.'),
		root = namespace.shift(),
		formParam = root;

		while(namespace.length){
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param : formParam,
			msg : msg,
			value : value
		};
	}
}));

// flash 
app.use(flash());

// global vars
app.use(function(req, res, next){
	res.locals.messages = require('express-messages')(req,res);
	if(req.url == '/'){
		res.locals.isHome = true;
	}
	next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/classes', classesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;