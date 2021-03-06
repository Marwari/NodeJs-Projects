var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
// User Schema
var userSchema = mongoose.Schema({
	username: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String,
		bcrypt: true
	},
	type: {
		type: String
	},
});

var User = module.exports = mongoose.model('User', userSchema);

// fetch all classes
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

// fetch single class
module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

// Save Student
module.exports.saveStudent = function(newUser, newStudent, callback){
	bcrypt.hash(newUser.password, 10, function(err, hash){
		if(err) throw err
			//set hash
		newUser.password = hash;
		console.log("Student is being saved");
		async.parallel([newUser.save.bind(newUser), newStudent.save.bind(newStudent)], callback);
	});
}

// Save Instructor
module.exports.saveInstructor = function(newUser, newInstructor, callback){
	bcrypt.hash(newUser.password, 10, function(err, hash){
		if(err) throw err
			//set hash
		newUser.password = hash;
		console.log("Instructor is being saved");
		async.parallel([newUser.save.bind(newUser), newInstructor.save.bind(newInstructor)], callback);
	});
}

// compare password
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		if(err) throw err;
		callback(null, isMatch);
	});
}