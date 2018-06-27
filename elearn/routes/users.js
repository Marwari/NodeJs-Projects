var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Include user model
var User = require('../models/user');
// Include student model
var Student = require('../models/student');
// Include user model
var Instructor = require('../models/instructor');

router.get('/signup', function(req, res, next) {
	res.render('users/signup');

});

router.post('/signup', function(req, res, next){
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var street_address = req.body.street_address;
	var city = req.body.city;
	var state = req.body.state;
	var zip = req.body.zip;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	var type = req.body.type;

	// form field validation
	req.checkBody('first_name', 'First name is required').notEmpty();
	req.checkBody('last_name', 'Lst name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email should be valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Password should match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('users/signup', {
			errors: errors,
			first_name: first_name,
			last_name: last_name,
			street_address: street_address,
			city: city,
			state: state,
			zip: zip,
			email: email,
			username: username,
			password: password,
			password2: password2
		});
	}else {
		var newStudent = new Student({
			first_name: first_name,
			last_name: last_name,
			address: [{
				street_address: street_address,
				city: city,
				state: state,
				zip: zip
			}],
			email: email,
			username: username
		});
		if(type == 'student'){
			User.saveStudent(newUser, newStudent, function(err, user){
				console.log("Student Created");
			});

		}else {
			User.saveInstructor(newUser, newInstructor, function(err, user){
				console.log("Instructor Created");

		});
		}
		re.flash('success', 'User added!');
		res.redirect('/');

	}
});

module.exports = router;
