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
	console.log("Trying to save book");
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
            res.status(500).json(err);
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
				//console.log(books);
				res.status(200).json(books);
			})
			.catch((error) => res.status(400).json(error));
		}
		else 
			res.redirect('/');
});


module.exports = router;