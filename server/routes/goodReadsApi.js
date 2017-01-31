const express = require('express');
const router = express.Router();
const goodreads = require('goodreads');
const axios = require ('axios');
const API = 'https://www.goodreads.com/book';
var userID = '15028994';
var devKey = 'ppN4P4legUMzGoIC2YBpQ';
var devSecret =  'bWnef9wrUeDbftso0yvLu7i7LG2KCjZ8nJzuZpius';
var parseString = require('xml2js').parseString;

function getGoodReadsURL(ISBN) {
	return 'https://www.goodreads.com/book/isbn/' + ISBN;
}

/* GET api listing. */
router.get('/', (req, res) => {
  	res.send('api works');
});

router.get('/searchBook', (req, res) => {
	//console.log(req.query);
	axios.get(getGoodReadsURL(req.query.searchQuery), {
		params: {
			key: 'ppN4P4legUMzGoIC2YBpQ',
			format: 'xml'
		}
	})
		.then (function (response) {
			console.log("Raw XML Response: " + response.data);
			parseString(response.data, function (err, result) {
				console.log("Successfully got data" + result);
				res.status(200).json(result);
			});
		})
		.catch(function (error) {
			console.log("Got Error from goodreads");
			res.status(error.response.status).send(error.response.statusText);
		});
});

module.exports = router;