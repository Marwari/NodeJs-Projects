var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

router.get('/add', function(req, res) {
	var categories = db.get('categories');
	categories.find({},{}, function(err, categories){
		res.render('addpost', {
			'title': 'Add Post',
			'categories': categories
		});
	});
	res.render('addpost', {
		"title": "Add Post"
	});
});

router.post('/add', function(req, res, next){
	//get form value
	var title = req.body.title;
	var category = req.body.category;
	var body = req.body.body;
	var author = req.body.author;
	var date = new Date();

	if(req.files.mainimage){
		var mainImageOriginalName = req.files.mainimage.originalname;
		var mainImageName = req.files.mainimage.name;
		var mainImageMime = req.files.mainimage.mimetype;
		var mainImagePath = req.files.mainimage.path;
		var mainImageExt = req.files.mainimage.extension;
		var mainImageSize = req.files.mainimage.size;
	} else{
		var mainImageName = 'noimage.png';
	}

	// form validation
	req.checkBody('title', 'Title field is required').notEmpty();
	req.checkBody('body', 'Body field is required')

	// check errors
	var errors = req.validationErrors();

	if(errors){
		res.render('addpost', {
			'errors' : errors,
			'title' : title,
			'body' : body
		});
	} else {
		var posts = db.get('posts');

		// submit to db
		posts.insert({
			'title' : title,
			'body' : body,
			'category' : category,
			'date' : date,
			'author' : author,
			'mainimage' : mainimage
		}, function(err, post){
			if(err){
				res.send('there is issue with submitting');
			} else {
				req.flash('success', 'Post Submitted');
				res.location('/');
				res.redirect('/');
			}
		});
	}
});

module.exports = router;