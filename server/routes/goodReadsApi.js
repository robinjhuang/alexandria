const express = require('express');
const router = express.Router();
var Promise = require('promise');
const goodreads = require('goodreads');
const axios = require ('axios');
const API = 'https://www.goodreads.com/book';
var userID = '15028994';
var devKey = 'ppN4P4legUMzGoIC2YBpQ';
var devSecret =  'bWnef9wrUeDbftso0yvLu7i7LG2KCjZ8nJzuZpius';
var parseString = require('xml2js').parseString;

function getGoodReadsISBNURL(ISBN) {
	return 'https://www.goodreads.com/book/isbn/' + ISBN;
}

function flatMap (array, callback) {
	return [].concat(array.map(callback));
}

function getGoodReadIds(response) {
	var goodReadsIds = flatMap(response.GoodreadsResponse.search[0].results, function(ele) {
		//console.log(ele);
		return flatMap(ele.work, function(el) {
			return el.best_book[0].id[0]._;
		});
	});
	return [].concat(...goodReadsIds); // spread notation
}

var resolve = function (a) {
	console.log("promise resolved");
	res.status(200).json(a);
}

var reject = function (err) {
	console.log("reject error");
	//console.log(err);
}

function getBookData(id) {
	return new Promise((resolve, reject) => {
		var url = 'https://www.goodreads.com/book/show/' + id + ".xml";
		//console.log("requesting for ID: " + id + "at URL: " + url);
		axios.get(url, {
			params: {
				key: 'ppN4P4legUMzGoIC2YBpQ'
			}
		})
		.then(function(response) {
			var searchRes;
			parseString(response.data, function parseGoodReadResponse(err, response) {
				if (!err) {
					var book = response.GoodreadsResponse.book[0];
					// console.log(book.authors);
					var obj = {
						"title": book.title[0],
						"isbn": book.isbn13[0] || book.isbn[0],
						"url": book.image_url[0],
						"description": book.description[0] || "",
						"author": book.authors[0].author[0].name[0] || "",
						"avg_rating": book.average_rating[0] || "",
						"num_pages": book.num_pages[0],
						"gr_url": book.url[0]
					};
					// console.log(obj);
					searchRes = obj;
				}
			});
			console.log("found search res");
			console.log(searchRes);
			resolve(searchRes);
		})
		.catch(function(error) {
			reject(error);
		});
	});
	
}

/* GET api listing. */
router.get('/', (req, res) => {
  	res.send('api works');
});

router.get('/searchBook', (req, res) => {
	axios.get('https://www.goodreads.com/search/index.xml', {
		params: {
			key: 'ppN4P4legUMzGoIC2YBpQ',
			q: req.query.searchQuery
		}
	})
	.then(function(response){	
		parseString(response.data, function (err, result) {
			var goodReadsIds = getGoodReadIds(result);
			console.log(goodReadsIds);
			var resPromises = goodReadsIds.map(getBookData);

			var results = Promise.all(resPromises)
			results.then((data) => {
				console.log(data);
				res.status(200).json(data)
			})
			.catch(err => console.log("error"));
			// res.status(200).json(result);
		});
	})
	.catch(function (error) {
		res.status(error.response.status).send(error.response.statusText);
	});
});

module.exports = router;