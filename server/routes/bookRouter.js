const express = require('express');
const router = express.Router();
var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

const User = require('../models').User;
const Book = require('../models').Book;
router.post('/addBook', (req, res) => {
	console.log(req.body);
	Book.findOrCreate({ where: {isbn: req.body._isbn, owner: req.user.fb_id },
		defaults: {
			title: req.body._title,
			author: req.body._author,
			isbn13: req.body._isbn13,
			description: req.body._description,
			image_url: req.body._image_url,
			avg_rating: req.body._avg_rating,
			num_pages: req.body._num_pages,
			publisher: req.body._publisher,
			gr_url: req.body._gr_url,
			owner: req.user.fb_id,
			checked_out: false


		}})
		.spread(function (book, created){
             res.status(200).json(book);
        }).error(function(err){
            throw(err);
        });
	
	
});


router.get('/getLibrary', function (req, res) {
		if (req.user != null){
			Book.findAll({
				where: {
					owner: req.user.fb_id
				}
			})
			.then((books) => {
				console.log(books);
				res.status(200).json(books);
			})
			.catch((error) => res.status(400).json(error));
		}
		else 
			res.redirect('/');
});


module.exports = router;


	/* CHECK IF BOOK IS ALREADY IN LIBRARY
	if (!req.user.library.includes(req.body._isbn)) {
		req.user.library.push(req.body._isbn); 
	}
	else {
		res.status(200).json("Book is already in your library");
	}
	var test = JSON.stringify(req.user.library);
	test = test.slice(1);
	test = test.slice(0, -1);
	sequelize.query("UPDATE \"Users\" SET library = '{" + test + "}' WHERE fb_id = '" + req.user.fb_id + "';").spread(function(results, metadata) {
		console.log(results);
		res.status(200).json("Book is added");
	});

	User.update(req.user, {
		where: {
			fb_id: req.user.fb_id
		}
	})
	.then(function (updatdRecord) {
		res.status(200).json(updatedRecords);
	})
	.catch(function (error) {
		res.status(500).json(error);
	});

	User.findOrCreate({where: {fb_id: req.user.fb_id}, 
		defaults: {
			access_token : 		req.user.access_token, // we will save the token that facebook provides to the user	                
			first_name : 		req.user.first_name,
			last_name : 		req.user.last_name, // look at the passport user profile to see how names are returned
			email : 			req.user.email, // facebook can return multiple emails so we'll take the first
			profilePictureURL : req.user.profilePictureURL,
			library: testlib
		}})
		.spread(function (user, created){
			res.status(200).json(user);
		}).error(function(err){
			res.status(500).json(err);
		});*/