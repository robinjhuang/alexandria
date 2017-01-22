var express = require('express');
var router = express.Router();

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
}

module.exports = function (passport){
	router.get('/isLoggedIn', isLoggedIn, 
		function(req, res) {
			res.json({user: req.user});
	});

	// route for facebook authentication and login
	router.get('/facebook', passport.authenticate('facebook', { scope : ['email'] }));

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


