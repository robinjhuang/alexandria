var express = require('express');
var router = express.Router();

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
}

module.exports = function (passport) {
	router.get('/getUser', isLoggedIn, 
		function(req, res) {
			console.log(req.sessionID);
			res.status(200).json({user: req.user});
	});

	router.get('/isLoggedIn', function(req, res) {
		if (req.isAuthenticated()) {
			res.send(true);
		}
		else
			res.send(false);
	});

	// route for facebook authentication and login
	router.get('/facebook', passport.authenticate('facebook', { scope : ['email']}));

	// handle the callback after facebook has authenticated the user
	router.get('/facebook/callback',
	  passport.authenticate('facebook', {
	    successRedirect : '/profile',
	    failureRedirect : '/login'
	  })
	);

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
    
	return router;
}


